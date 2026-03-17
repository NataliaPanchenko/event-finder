import styled from "styled-components";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { mutate } from "swr";
import { useState } from "react";
import Image from "next/image";
import { getDate } from "../EventsList/EventItem/EventItem";
import NoElements from "../NoElements";
import { ShoppingCart } from "lucide-react";

export default function CartList({ cartItems }) {
  const [confirmId, setConfirmId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  if (!cartItems || cartItems.length === 0)
    return (
      <NoElements
        titel="Your cart is empty"
        description="Add some events to your cart to get started"
        icon={<ShoppingCart size="30" />}
      />
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
      {cartItems?.map((item) => (
        <TicketCard key={item._id}>
          <ImageWrapper href={`/events/${item.eventId._id}`}>
            {console.log("item", item)}
            <Image
              src={item.eventId.image ? item.eventId.image : "/event-img.jpg"}
              alt={item.eventId?.title || "Event image"}
              fill
            />
          </ImageWrapper>
          <Info>
            <Category>{item.eventId.category?.name || "No category"}</Category>
            <Title>{item.eventId?.title}</Title>
            <DateRow>
              📅 <span>{getDate(item.eventId?.date)}</span>
            </DateRow>
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
              <Quantity>{item.quantity}</Quantity>
              <button
                disabled={item.quantity >= item.eventId?.availableTickets}
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </button>
            </CartItemControls>
            <StyledTrash size="17" onClick={() => setConfirmId(item._id)} />
          </Info>
          <Price>€{item.eventId.price * item.quantity}</Price>
          {confirmId === item._id && (
            <ConfirmBox>
              <p>Delete this ticket(s)?</p>
              <ConfirmButtons>
                <button
                  onClick={() => handleDelete(item._id, item.eventId?.title)}
                >
                  Yes
                </button>
                <button onClick={() => setConfirmId(null)}>Cancel</button>
              </ConfirmButtons>
            </ConfirmBox>
          )}
        </TicketCard>
      ))}
      <BackLink href="/">← Back to events</BackLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TicketCard = styled.div`
  position: relative;
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
  margin: 0;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #222;
`;

const DateRow = styled.div`
  margin-top: 6px;
  color: #777;
  font-size: 14px;
`;

const Quantity = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
  padding: 0 14px;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #000000;
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
  position: absolute;
  top: 15px;
  right: 15px;
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
  border: 1px solid #4caf50;
  color: var(--text-color);
  background-color: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  width: 30%;
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

const ImageWrapper = styled(Link)`
  position: relative;
  width: 180px;
  height: 140px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 12px 0 0 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
  img {
    object-fit: cover;
  }
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 600px) {
    margin-right: 10px;
  }
`;

const Category = styled.p`
  display: block;
  width: fit-content;
  background-color: rgba(129, 177, 255, 0.7);
  border-radius: 5px;
  color: white;
  font-size: 0.95rem;
  padding: 5px;
  color: rgb(26, 7, 123);
  margin: 0;
`;
