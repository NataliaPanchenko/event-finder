import Cart from "@/components/Cart/Cart";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading cart...</p>;

  return (
    <Container>
      <h3>My tickets</h3>
      <Cart cartItems={cartItems} />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 1000px;
  margin: 20px;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;
