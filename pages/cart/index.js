import Cart from "@/components/Cart/Cart";
import styled from "styled-components";
import useSWR from "swr";
import OrderSummary from "@/components/Cart/OrderSummary";
import { useState } from "react";
import { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CartPage() {
  const { data: cartItems, error, isLoading } = useSWR("/api/cart", fetcher);
  const [clearCartMessage, setClearCartMessage] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  async function clearCart() {
    const response = await fetch("/api/cart", {
      method: "DELETE",
    });

    if (response.ok) {
      mutate("/api/cart");
      setConfirmClear(false);
      setClearCartMessage(`Cart has been cleared 🗑`);
      setTimeout(() => setClearCartMessage(""), 3000);
    } else {
      alert("Error clearing cart");
    }
  }

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Failed to load cart</p>;

  return (
    <Container>
      <Header>
        {clearCartMessage && <Message>{clearCartMessage}</Message>}
        <Title>Shopping Cart</Title>
        {confirmClear && (
          <ConfirmBox>
            <p>Delele all tickets?</p>
            <ConfirmButtons>
              <button onClick={clearCart}>Yes</button>
              <button onClick={() => setConfirmClear(false)}>Cancel</button>
            </ConfirmButtons>
          </ConfirmBox>
        )}
        <Clear onClick={() => setConfirmClear(true)}>Clear Cart</Clear>
      </Header>
      <CartLayout>
        <Cart cartItems={cartItems} />
        <OrderSummary cartItems={cartItems} />
      </CartLayout>
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

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
`;

const Clear = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

const ConfirmBox = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  background: white;
  padding: 14px 18px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  width: 200px;
  button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
  button:first-child {
    background: #e74c3c;
    color: white;
  }
  button:last-child {
    background: #ddd;
  }
`;

const Message = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  width: 80%;
`;
