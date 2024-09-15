// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import LoginForm from "../pages/Login";
import { describe, it, expect, vi } from "vitest";

// Mock axios
vi.mock("axios");

describe("LoginForm", () => {
  it("should render the login form", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should display error message on failed login", async () => {
    vi.mock("axios", () => ({
      default: {
        post: vi.fn().mockRejectedValue({
          response: { data: { message: "Login failed" } },
        }),
      },
    }));

    render(<LoginForm />);

    // dummy inpot
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // error message
    await waitFor(() => expect(screen.getByText(/login failed/i)).toBeInTheDocument());
  });

  it("should display success message on successful login", async () => {
    // mocking again after succesful login

    vi.mock("axios", () => ({
      default: {
        post: vi.fn().mockResolvedValue({
          response: {
            status: 200,
            data: { accessToken: "fakeAccessToken" },
          },
        }),
      },
    }));
    // (axios.post as vi.Mock).mockResolvedValue({
    //   status: 200,
    //   data: { accessToken: "fakeAccessToken" },
    // });

    render(<LoginForm />);

    // dummy input
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText(/login successful/i)).toBeInTheDocument());

    expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", "fakeAccessToken");
  });
});
