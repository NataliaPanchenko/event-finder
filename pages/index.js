import EventsList from "@/components/EventsList/EventsList";
import styled from "styled-components";

export default function HomePage({ events, error, isLoading }) {
  if (isLoading) return <h2>Loading...</h2>;
  if (error) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <StyledTitel>🎫 Event Finder App</StyledTitel>
      <EventsList events={events} />
    </>
  );
}

const StyledTitel = styled.h2`
  color: var(--titel-color);
`;
