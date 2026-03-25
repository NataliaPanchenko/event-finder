import styled from "styled-components";
import EventItem from "./EventItem/EventItem";
import { useRouter } from "next/router";
import Error from "../Error";
import Loading from "../Loading";
import NoOrders from "../NoOrders";
import { CircleQuestionMark } from "lucide-react";

export default function EventsList({ events, isLoading, error }) {
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) {
    return <Error />;
  }

  if (!Array.isArray(events) || events.length === 0) {
    return <NoOrders text="No events found" />;
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
