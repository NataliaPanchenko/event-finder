import Cart from "@/components/Cart/Cart";
import styled from "styled-components";
import useSWR from "swr";
import OrderSummary from "@/components/Cart/OrderSummary";

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
