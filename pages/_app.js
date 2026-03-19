import GlobalStyle from "../styles";
import useSWR from "swr";
import styled from "styled-components";
import { ShoppingBag } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);
  const { data: cartItems } = useSWR("/api/cart", fetcher);
  const { data: favorites } = useSWR("/api/favorites", fetcher);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const favoritesCount = favorites?.length;

  return (
    <AppWrapper>
      <ContentWrapper>
        <GlobalStyle />
        <Header>
          <StyledTitel href="/">
            🎫 <GradientWord>Event</GradientWord>{" "}
            <GraphiteWord>Finder</GraphiteWord>
          </StyledTitel>
          <CartWrapper>
            <IconWrapper>
              <StyledIcon href="/favorites">
                <Heart size="25" />
                {favoritesCount > 0 && (
                  <FavoritesBadge>{favoritesCount}</FavoritesBadge>
                )}
              </StyledIcon>
            </IconWrapper>
            <IconWrapper>
              <StyledIcon href="/cart">
                <ShoppingBag size="25" />
                {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
              </StyledIcon>
            </IconWrapper>
          </CartWrapper>
        </Header>
        <Component
          {...pageProps}
          events={events}
          isLoading={isLoading}
          error={error}
          favorites={favorites}
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px 0 30px;
`;

const CartWrapper = styled.div`
  top: 35px;
  right: 30px;
  cursor: pointer;
  color: var(--title-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const StyledTitel = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  display: flex;
  gap: 6px;
  font-size: 32px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.01);
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
  color: var(--title-color);
  margin: 10px 0 0 0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    color: var(--black-color);
  }
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

const StyledIcon = styled(Link)`
  position: relative;
  text-decoration: none;
  margin: 0;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -19px;
  right: -12px;
  background: #2563eb;
  color: white;
  font-size: 12px;
  font-weight: 700;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FavoritesBadge = styled.div`
  position: absolute;
  top: -19px;
  right: -12px;
  background: #ff4d4d;
  color: white;
  font-size: 12px;
  font-weight: 700;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
