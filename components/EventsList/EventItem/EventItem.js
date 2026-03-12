import Image from "next/image";
import { MapPin } from "lucide-react";
import styled from "styled-components";

export function getDate(date) {
  const eventDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return eventDate;
}

export default function EventItem({ event }) {
  return (
    <Card>
      <Content>
        <ImageWrapper>
          <Image
            src={"/event-img.jpg"}
            alt={event.title}
            width="50"
            height="50"
          />
        </ImageWrapper>
        <DateText>{getDate(event.date)}</DateText>
        <Title>{event.title}</Title>
        <Location>
          <MapPin size="12" />
          {event.location.name}
        </Location>
      </Content>
    </Card>
  );
}

const Card = styled.div`
  width: 225px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 12px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 12px;
`;

const DateText = styled.p`
  font-size: 13px;
  color: var(--text-color);
  margin: 0 0 4px 0;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 6px 0;
  color: #222;
`;

const Location = styled.p`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: var(--text-color);
  margin: 0 0 4px 0;
`;
