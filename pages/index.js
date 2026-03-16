import EventsList from "@/components/EventsList/EventsList";
import styled from "styled-components";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default function HomePage({ events, error, isLoading }) {
  if (isLoading) return <Loading />;
  if (error) {
    return <Error />;
  }

  return (
    <Container>
      <EventsList events={events} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  min-height: 100vh;
  padding: 10px;
  color: var(--text-color);
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;
