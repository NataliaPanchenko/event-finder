import styled from "styled-components";
import EventItem from "./EventItem/EventItem";
import { useRouter } from "next/router";
import Error from "../Error";

export default function EventsList({ events, isLoading, error }) {
  const router = useRouter();
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    return <Error />;
  }

  if (!Array.isArray(events) || events.length === 0) {
    return <h3>No events found.</h3>;
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
