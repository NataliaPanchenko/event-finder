import EventsList from "@/components/EventsList/EventsList";
import styled from "styled-components";

export default function HomePage({ events, error, isLoading }) {
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    return <h2>Error</h2>;
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
