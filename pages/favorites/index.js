import styled from "styled-components";
import EventItem from "@/components/EventsList/EventItem/EventItem";
import { useRouter } from "next/router";
import NoElements from "@/components/NoElements";
import { Heart } from "lucide-react";
import { mutate } from "swr";

export default function Favorites({ favorites }) {
  const handleRemoveFavorites = async (id) => {
    await fetch(`/api/favorites/${id}`, { method: "DELETE" });
    mutate("/api/favorites");
  };

  const router = useRouter();

  if (!favorites || favorites.length === 0)
    return (
      <EmptyWrapper>
        <NoElements
          title="Your wishlist is empty"
          description="Add some events to your wishlist to get started"
          icon={<Heart size="30" />}
        />
      </EmptyWrapper>
    );

  return (
    <>
      <Container>
        <Header>
          <TitleBlock>
            <Title>
              <StyledHeart size={25} />
              My Favorites
            </Title>
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

const EmptyWrapper = styled.div`
  margin-top: 60px;
`;

const Container = styled.div`
  padding: 10px;
  max-width: 100vh;
  margin: 10px auto;
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
  display: flex;
  align-items: center;
  gap: 7px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  margin: 10px;
`;

const StyledHeart = styled(Heart)`
  margin-top: 2px;
  color: var(--delete-color);
  fill: var(--delete-color);
`;
