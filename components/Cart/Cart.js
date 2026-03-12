import styled from "styled-components";
import Link from "next/link";

export default function Cart({ cartItems }) {
  if (!cartItems) return <p>Loading cart...</p>;
  if (cartItems.length === 0)
    return (
      <Container>
        <p>Your cart is empty 🛒</p>
        <Link href="/">← Back to Homepage</Link>
      </Container>
    );

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
  margin: 0;
`;
