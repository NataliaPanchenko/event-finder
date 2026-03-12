import styled from "styled-components";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { mutate } from "swr";

export default function Cart({ cartItems }) {
  if (!cartItems || cartItems.length === 0)
    return (
      <EmptyCart>
        <p>Your cart is empty 🛒</p>
        <StyledLink href="/">Browse events</StyledLink>
      </EmptyCart>
    );

  console.log("cartItems", cartItems);

  async function handleDelete(id, title) {
    const response = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate("/api/cart");
      alert(`Ticket "${title}" has been deleted 🗑`);
    }
  }

  return (
    <Wrapper>
      {cartItems.map((item) => (
        <TicketCard key={item._id}>
          <Info>
            <Title>{item.title}</Title>
            <Quantity>Tickets: {item.quantity}</Quantity>
            <StyledTrash
              size="17"
              onClick={() => handleDelete(item._id, item.title)}
            />
          </Info>
          <Price>${item.price}</Price>
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
