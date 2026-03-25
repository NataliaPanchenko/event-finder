import { useSession, signIn } from "next-auth/react";
import { Heart, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import Button from "./Button";

export default function HeaderContent({ favoritesCount, cartCount }) {
  const { data: session } = useSession();

  return (
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
        <IconWrapper>
          <StyledIcon href="/profile">
            <User size="25" />
          </StyledIcon>
        </IconWrapper>

        {session ? null : <Button text="Sign in" onClick={() => signIn()} />}
      </CartWrapper>
    </Header>
  );
}

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px 0 30px;
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
