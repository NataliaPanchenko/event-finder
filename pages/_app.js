import GlobalStyle from "../styles";
import useSWR from "swr";
import styled from "styled-components";
import { ShoppingBag } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const { data: cartItems } = useSWR("/api/cart", fetcher);

  const cartCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const favoritesCount = favorites?.length;

  return (
    <>
      <GlobalStyle />
      <StyledHeader>
        <StyledTitel href="/">
          🎫 <GradientWord>Event</GradientWord>{" "}
          <GraphiteWord>Finder</GraphiteWord>
        </StyledTitel>
        <IconsWrapper>
          <StyledIcon href="/favorites">
            <Heart size="25" />
            {favoritesCount > 0 && (
              <FavoritesBadge>{favoritesCount}</FavoritesBadge>
            )}
          </StyledIcon>
          <StyledIcon href="/cart">
            <ShoppingBag size="25" />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </StyledIcon>
        </IconsWrapper>
      </StyledHeader>
      <Component
        {...pageProps}
        events={events}
        isLoading={isLoading}
        error={error}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <Footer />
    </>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 15px;
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

const IconsWrapper = styled.div`
  cursor: pointer;
  color: var(--title-color);
  margin: 10px 15px 0 0;
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
  margin-left: 20px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.01);
    color: var(--black-color);
  }
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
