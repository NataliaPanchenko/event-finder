import GlobalStyle from "../styles";
import useSWR from "swr";
import styled from "styled-components";
import { ShoppingBag } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);
  const { data: cartItems } = useSWR("/api/cart", fetcher);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <AppWrapper>
      <ContentWrapper>
        <GlobalStyle />
        <StyledTitel>
          🎫 <GradientWord>Event</GradientWord>{" "}
          <GraphiteWord>Finder</GraphiteWord>
        </StyledTitel>
        <CartWrapper>
          <StyledLink href="/cart">
            <ShoppingBag size="25" />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </StyledLink>
        </CartWrapper>
        <Component
          {...pageProps}
          events={events}
          isLoading={isLoading}
          error={error}
        />
      </ContentWrapper>
      <Footer />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const CartWrapper = styled.div`
  position: absolute;
  top: 35px;
  right: 30px;
  cursor: pointer;
  color: var(--title-color);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    color: var(--black-color);
  }
`;

const StyledTitel = styled.h2`
  margin-left: 10px;
  font-weight: 700;
  display: flex;
  gap: 6px;
  font-size: 32px;
`;

const GradientWord = styled.span`
  background: linear-gradient(90deg, #b23cfb, #d147ff, #fb39ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GraphiteWord = styled.span`
  color: #3a3a3a;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -19px;
  right: -12px;
  background: #2563eb;
  color: white;
  font-size: 12px;
  font-weight: 700;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
