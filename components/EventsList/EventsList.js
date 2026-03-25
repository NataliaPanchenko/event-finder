import styled from "styled-components";
import EventItem from "./EventItem/EventItem";
import { useRouter } from "next/router";
import Error from "../Error";
import Loading from "../Loading";
import NoElements from "../NoElements";
import { CircleQuestionMark } from "lucide-react";

export default function EventsList({ events, isLoading, error }) {
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) {
    return <Error />;
  }

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <EmptyCart>
        <IconWrapper>
          <CircleQuestionMark size="30" />
        </IconWrapper>
        <Title>No events found</Title>
      </EmptyCart>
    );
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

const EmptyCart = styled.div`
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f2f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  svg {
    width: 36px;
    height: 36px;
    color: #9aa0a6;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;
