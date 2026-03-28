import { useSession, signIn } from "next-auth/react";
import { Heart, ShoppingBag, User, MapIcon } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import Button from "./Button";

export default function HeaderContent({ favoritesCount, cartCount }) {
  const { data: session } = useSession();

  return (
    <Header>
      <StyledTitel href="/">
        <TitelWrapper>
          <EventIcon>EF</EventIcon>
          <GraphiteWord> Event Finder</GraphiteWord>
        </TitelWrapper>
        {session ? null : (
          <ProfileButton>
            <Button onClick={() => signIn()} />
          </ProfileButton>
        )}
      </StyledTitel>

      <CartWrapper>
        <IconWrapper href="/map">
          <StyledIcon>
            <MapIcon size={15} />
          </StyledIcon>
          <Text>Map</Text>
        </IconWrapper>
        <IconWrapper href="/favorites">
          <StyledIcon>
            <Heart size={15} />
          </StyledIcon>
          <Text>Favorites</Text>
          {favoritesCount > 0 && (
            <FavoritesBadge>{favoritesCount}</FavoritesBadge>
          )}
        </IconWrapper>
        <IconWrapper href="/cart">
          <StyledIcon>
            <ShoppingBag size={15} />
          </StyledIcon>
          <Text>Cart</Text>
          {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
        </IconWrapper>
        <IconWrapper href="/profile">
          <StyledIcon>
            <User size={15} />
          </StyledIcon>
          <Text>Profile</Text>
        </IconWrapper>
      </CartWrapper>
    </Header>
  );
}

const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  @media (min-width: 769px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (max-width: 600px) {
    margin-top: 10px;
    position: static;
    transform: none;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: var(--surface-color);
  box-shadow: var(--header-shadow);
  @media (max-width: 768px) {
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
  }
`;

const EventIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: var(--hero-gradient);
  color: var(--white-color);
  padding: 5px;
  font-size: 18px;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
`;

const TitelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`;

const StyledTitel = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 24px;
  @media (max-width: 600px) {
    font-size: 24px;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 400px) {
    display: none;
  }
`;

const IconWrapper = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  gap: 3px;
  position: relative;
  color: var(--black-color);
  height: 30px;
  padding: 2px 15px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  text-decoration: none;
  &:hover {
    background-color: var(--icon-background);
    p {
      color: var(--black-color);
    }
    div {
      color: var(--black-color);
    }
  }
`;

const GraphiteWord = styled.span`
  color: var(--main-color);
`;

const StyledIcon = styled.div`
  position: relative;
  text-decoration: none;
  color: var(--main-color);
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 300px;
  color: var(--main-color);
  text-decoration: none;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -6px;
  right: 0;
  color: var(--white-color);
  font-size: 12px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--main-color);
`;

const FavoritesBadge = styled(CartBadge)`
  background: var(--main-color);
`;

const ProfileButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
