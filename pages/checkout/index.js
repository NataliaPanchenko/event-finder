import SecureCheckout from "@/components/Checkout/SecureCheckout";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CheckoutPage() {
  const { data: cartItems, error, isLoading } = useSWR("/api/cart", fetcher);
  return (
    <Container>
      <Grid>
        <Left>
          <SecureCheckout />
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
  max-width: 1000px;
  min-height: 100vh;
  margin: 20px;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div``;

const Right = styled.div``;
