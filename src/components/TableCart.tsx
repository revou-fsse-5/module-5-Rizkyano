import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

interface CartValue {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartProps {
  totalPrice: number;
  cartItems: CartValue[];
  onClearCart: () => void;
}
const TableCart: React.FC<CartProps> = ({ totalPrice, cartItems, onClearCart }) => {
  return (
    <Container>
      <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <CardMedia component="img" alt="green iguana" sx={{ height: 100, objectFit: "contain" }} image={item.image} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell>${totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button size="medium" onClick={onClearCart}>
                  Clear
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableCart;
