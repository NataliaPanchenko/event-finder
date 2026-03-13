import styled from "styled-components";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { mutate } from "swr";
import { useState } from "react";

export default function Cart({ cartItems }) {
  const [confirmId, setConfirmId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  if (!cartItems || cartItems.length === 0)
    return (
      <EmptyCart>
        <p>Your cart is empty 🛒</p>
        <StyledLink href="/">Browse events</StyledLink>
      </EmptyCart>
    );

  async function handleDelete(id, title) {
    const response = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate("/api/cart");
      setConfirmId(null);
      setDeleteMessage(`Ticket "${title}" has been deleted 🗑`);
      setTimeout(() => setDeleteMessage(""), 3000);
    } else {
      alert("Error. Please try again");
    }
  }

  async function updateQuantity(id, newQuantity) {
    const response = await fetch(`/api/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (response.ok) {
      mutate("/api/cart");
    } else {
      alert("Error updating quantity");
    }
  }

  return (
    <Wrapper>
      {deleteMessage && <Message>{deleteMessage}</Message>}
      {cartItems.map((item) => (
        <TicketCard key={item._id}>
          <Info>
            <Title>{item.title}</Title>
            <CartItemControls>
              <button
                disabled={item.quantity <= 1}
                onClick={() =>
                  item.quantity > 1 &&
                  updateQuantity(item._id, item.quantity - 1)
                }
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                disabled={item.quantity >= item.availableTickets}
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </button>
            </CartItemControls>
            <StyledTrash size="17" onClick={() => setConfirmId(item._id)} />
          </Info>
          <Price>${item.price}</Price>
          {confirmId === item._id && (
            <ConfirmBox>
              <p>Delete this ticket(s)?</p>
              <ConfirmButtons>
                <button onClick={() => handleDelete(item._id, item.title)}>
                  Yes
                </button>
                <button onClick={() => setConfirmId(null)}>Cancel</button>
              </ConfirmButtons>
            </ConfirmBox>
          )}
        </TicketCard>
      ))}
      <BackLink href="/">← Continue browsing events</BackLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TicketCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #222;
`;

const Quantity = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #0070f3;
`;

const EmptyCart = styled.div`
  text-align: center;
  margin-top: 80px;
  p {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const StyledLink = styled(Link)`
  color: #0070f3;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const BackLink = styled(Link)`
  margin-top: 30px;
  text-decoration: none;
  color: #555;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledTrash = styled(Trash2)`
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    color: var(--delete-color);
  }
`;

const ConfirmBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  text-align: center;
`;

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8px;
  button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    &:first-child {
      background: #e74c3c;
      color: white;
    }
    &:last-child {
      background: #bdc3c7;
      color: black;
    }
  }
`;

const Message = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  background-color: #e74c3c;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  width: 80%;
`;

const CartItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  button {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #f0f0f0;
    }
  }
  span {
    min-width: 24px;
    text-align: center;
  }
`;
