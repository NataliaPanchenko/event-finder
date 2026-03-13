import GlobalStyle from "../styles";
import useSWR from "swr";
import styled from "styled-components";
import { ShoppingBag } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: events, error, isLoading } = useSWR("/api/events", fetcher);

  return (
    <>
      <GlobalStyle />
      <StyledTitel>
        🎫 <GradientWord>Event</GradientWord>{" "}
        <GraphiteWord>Finder</GraphiteWord>
      </StyledTitel>
      <CartWrapper>
        <StyledLink href="/cart">
          <ShoppingBag size="25" />
        </StyledLink>
      </CartWrapper>
      <Component
        {...pageProps}
        events={events}
        isLoading={isLoading}
        error={error}
      />
      <Footer />
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
`;
