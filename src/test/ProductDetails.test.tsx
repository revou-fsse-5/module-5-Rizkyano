import { describe, test, expect, vi, beforeEach, afterEach, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom";
import ProductDetail from "../pages/ProductDetails";

vi.mock("axios");
// const mockedAxios = axios as vi.Mocked<typeof axios>;

// Mock dummy data
const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description.",
  price: 99.99,
  image: "https://via.placeholder.com/150",
};

describe("ProductDetail Component", () => {
  const mockOnAddCart = vi.fn();
  const mockOnRemoveCart = vi.fn();
  const mockCart = [1];

  beforeEach(() => {
    vi.mock("axios", () => ({
      get: vi.fn().mockResolvedValue({ data: mockProduct }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (id: string) => {
    return render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail onAddCart={mockOnAddCart} onRemoveCart={mockOnRemoveCart} cart={mockCart} />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("fetches and displays product data", async () => {
    renderComponent("1");

    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Test Product")).toBeInTheDocument());

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("This is a test product description.")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("calls onRemoveCart when product is in cart", async () => {
    renderComponent("1");

    await waitFor(() => expect(screen.getByText("Test Product")).toBeInTheDocument());

    const button = screen.getByText("Remove From Cart");
    fireEvent.click(button);

    expect(mockOnRemoveCart).toHaveBeenCalledWith(1);
  });

  it("calls onAddCart when product is not in cart", async () => {
    renderComponent("2");

    vi.mock("axios", () => ({
      get: vi.fn().mockResolvedValue({
        data: { ...mockProduct, id: 2 },
      }),
    }));

    await waitFor(() => expect(screen.getByText("Test Product")).toBeInTheDocument());

    const button = screen.getByText("Add To Cart");
    fireEvent.click(button);

    expect(mockOnAddCart).toHaveBeenCalledWith(2);
  });
});
