import styled from "styled-components";
import EventItem from "./EventItem/EventItem";
import Link from "next/link";

export default function EventsList({ events, isLoading, error }) {
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    return <h2>Error</h2>;
  }

  if (!Array.isArray(events) || events.length === 0) {
    return <h3>No events found.</h3>;
  }

  return (
    <Container>
      {events.map((event) => (
        <StyledLink key={event._id} href={`/events/${event._id}`}>
          <EventItem event={event} />
        </StyledLink>
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

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
