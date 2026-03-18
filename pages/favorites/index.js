import styled from "styled-components";
import EventItem from "@/components/EventsList/EventItem/EventItem";
import { useRouter } from "next/router";
import NoElements from "@/components/NoElements";
import { Heart } from "lucide-react";
import { mutate } from "swr";

export default function Favorites({ events, favorites }) {
  const handleRemoveFavorites = async (id) => {
    await fetch(`/api/favorites/${id}`, { method: "DELETE" });
    mutate("/api/favorites");
  };

  const router = useRouter();

  if (!favorites || favorites.length === 0)
    return (
      <NoElements
        title="Your wishlist is empty"
        description="Add some events to your wishlist to get started"
        icon={<Heart size="30" />}
      />
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
        <EventsWrapper>
          {favorites?.map((fav) => (
            <EventItem
              key={fav._id}
              event={fav.eventId}
              onClick={() => router.push(`/events/${fav.eventId._id}`)}
              remove={() => handleRemoveFavorites(fav.eventId._id)}
            />
          ))}
        </EventsWrapper>
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

const EventsWrapper = styled.div`
  margin: 10px;
`;
