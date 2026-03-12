import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Cart({ cartItems, setCartItems }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setCartItems]);

  if (!cartItems || loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty 🛒</p>;

  return (
    <Container>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id}>
          <p>{item.title}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(80, 80, 80);
`;
