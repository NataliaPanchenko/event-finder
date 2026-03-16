import styled from "styled-components";
import EventItem from "./EventItem/EventItem";
import { useRouter } from "next/router";
import Error from "../Error";
import Loading from "../Loading";

export default function EventsList({ events, isLoading, error }) {
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) {
    return <Error />;
  }

  if (!Array.isArray(events) || events.length === 0) {
    return <Error message="No events found." />;
  }

  return (
    <Container>
      {events.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          onClick={() => router.push(`/events/${event._id}`)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-content: center;
  justify-items: center;
  gap: 20px;
`;
