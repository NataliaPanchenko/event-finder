import CartList from "@/components/CartList/CartList";
import styled from "styled-components";
import useSWR from "swr";
import OrderSummary from "@/components/CartList/OrderSummary";
import { useState } from "react";
import { mutate } from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { ShoppingCart } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CartPage() {
  const { data: cartItems, error, isLoading } = useSWR("/api/cart", fetcher);
  const [clearCartMessage, setClearCartMessage] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const quantityItems = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

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

  if (isLoading) return <Loading />;
  if (error) return <Error message="Failed to load cart" />;

  return (
    <Container>
      {(!cartItems || cartItems.length === 0) && (
        <Header>
          {clearCartMessage && <Message>{clearCartMessage}</Message>}

          {cartItems && cartItems.length !== 0 && (
            <TitleBlock>
              <Title>
                <ShoppingCart size={25} />
                Shopping Cart
              </Title>
              <CartInfo>
                {quantityItems}
                {quantityItems === 1 ? ` item` : ` items`} in your cart
              </CartInfo>
            </TitleBlock>
          )}

          {confirmClear && (
            <ConfirmBox>
              <p>Delele all tickets?</p>
              <ConfirmButtons>
                <button onClick={clearCart}>Yes</button>
                <button onClick={() => setConfirmClear(false)}>Cancel</button>
              </ConfirmButtons>
            </ConfirmBox>
          )}
          {quantityItems !== 0 && (
            <Clear onClick={() => setConfirmClear(true)}>Clear Cart</Clear>
          )}
        </Header>
      )}

      <CartLayout>
        <CartList cartItems={cartItems} />
        {quantityItems !== 0 && <OrderSummary cartItems={cartItems} />}
      </CartLayout>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
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
  margin-bottom: 5px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Clear = styled.button`
  background: none;
  border: none;
  color: var(--main-color);
  cursor: pointer;
`;

const ConfirmBox = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  background: white;
  padding: 14px 18px;
  border-radius: 10px;
  box-shadow: var(--confirm-box-shadow);
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
    background: var(--delete-color);
    color: var(--white-color);
  }
  button:last-child {
    background: var(--delete-bg);
  }
`;

const Message = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  color: var(--white-color);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  width: 80%;
`;

const CartInfo = styled.p`
  font-size: 14px;
  color: var(--info-color);
  margin: 0;
`;
