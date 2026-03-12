import GlobalStyle from "../styles";
import useSWR from "swr";
import styled from "styled-components";
import { ShoppingCart } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);

  return (
    <>
      <GlobalStyle />
      <CartWrapper>
        <ShoppingCart size="25" />
      </CartWrapper>
      <Component
        {...pageProps}
        events={events}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

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
  }
`;
