import styled from "styled-components";
import EventItem from "@/components/EventsList/EventItem/EventItem";
import { EmptyCart, StyledLink } from "@/components/CartList/CartList";
import { useRouter } from "next/router";

export default function Favorites({ events, favorites }) {
  const router = useRouter();

  const favoriteEvents = events?.filter((event) =>
    favorites?.includes(event._id)
  );

  if (!favorites || favorites.length === 0)
    return (
      <EmptyCart>
        <p>Your wishlist is empty 💔</p>
        <StyledLink href="/">Browse events</StyledLink>
      </EmptyCart>
    );

  return (
    <>
      <Container>
        <Header>
          <TitleBlock>
            <Title>My Wishlist</Title>
            {favorites.length}
            {favorites.length === 1 ? ` event` : ` events`}
          </TitleBlock>
        </Header>
        {console.log("events", events)}
        {console.log("favorites", favorites)}
        {console.log("favoriteEvents", favoriteEvents)}
        {favoriteEvents.map((event) => (
          <EventItem
            key={event._id}
            event={event}
            onClick={() => router.push(`/events/${event._id}`)}
          />
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 1000px;
  margin: 20px;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 10px 0;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
