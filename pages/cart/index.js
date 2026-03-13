import Cart from "@/components/Cart/Cart";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CartPage() {
  const { data: cartItems, error, isLoading } = useSWR("/api/cart", fetcher);

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Failed to load cart</p>;

  return (
    <Container>
      <Header>
        <Title>Shopping Cart</Title>
        <Clear>Clear Cart</Clear>
      </Header>
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
