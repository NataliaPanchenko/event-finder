import { SessionProvider } from "next-auth/react";
import GlobalStyle from "../styles";
import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import HeaderContent from "@/components/HeaderContent";
import ProtectedRoute from "@/components/ProtectedRoute";

const fetcher = (url) => fetch(url).then((res) => res.json());
const protectedPaths = ["/", "/profile", "/cart", "/favorites"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);
  const { data: cartItems } = useSWR("/api/cart", fetcher);
  const { data: favorites } = useSWR("/api/favorites", fetcher);
  const { data: categories } = useSWR("/api/categories", fetcher);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;

  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <AppWrapper>
        <HeaderContent favoritesCount={favoritesCount} cartCount={cartCount} />
        <ProtectedRoute>
          <ContentWrapper>
            <Component
              {...pageProps}
              events={events}
              isLoading={isLoading}
              error={error}
              favorites={favorites}
              categories={categories}
            />
          </ContentWrapper>
        </ProtectedRoute>
        <Footer />
      </AppWrapper>
    </SessionProvider>
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
