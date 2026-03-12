import Cart from "@/components/Cart/Cart";
import styled from "styled-components";

export default function CartPage({ cartItems, setCartItems }) {
  return (
    <Container>
      <h3>My tickets</h3>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
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
