import SecureCheckout from "@/components/Checkout/SecureCheckout";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";
import styled from "styled-components";
import useSWR from "swr";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CheckoutPage() {
  const { data: cartItems, error, isLoading } = useSWR("/api/cart", fetcher);
  return (
    <Container>
      <BackButton href="/cart">
        <ArrowLeft size="16" />
        <BackButtonText>Back to Cart</BackButtonText>
      </BackButton>
      <Grid>
        <Left>
          <SecureCheckout cartItems={cartItems} />
        </Left>
        <Right>
          <CheckoutSummary cartItems={cartItems} />
        </Right>
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 1100px;
  min-height: 100vh;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

const BackButton = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #474747;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
  margin-bottom: 20px;
`;

const BackButtonText = styled.p`
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div``;

const Right = styled.div``;
