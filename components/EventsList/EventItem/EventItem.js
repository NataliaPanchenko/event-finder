import Image from "next/image";
import { MapPin } from "lucide-react";
import styled from "styled-components";
import { Calendar } from "lucide-react";

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

export default function EventItem({ event, onClick}) {
  return (
    <Card onClick={onClick}>
      <Content>
        <ImageWrapper>
          <Image
            src={event.image ? event.image : "/event-img.jpg"}
            alt={event.title}
            fill
          />
          <CategoryBadge>{event.category?.name}</CategoryBadge>
        </ImageWrapper>
        <Title>{event.title}</Title>
        <DateText>
          <Calendar size="12" /> {getDate(event.date)}
        </DateText>
        <Location>
          <MapPin size="12" />
          {event.location?.name || "Unknown location"}
        </Location>
        <CardFooter>
          <Price>€{event.price}</Price>
          <DetailsButton>View Details</DetailsButton>
        </CardFooter>
      </Content>
    </Card>
  );
}

const Card = styled.div`
  width: 500px;
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
  @media (max-width: 600px) {
    width: 400px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  img {
    object-fit: cover;
    transition: transform 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
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
  margin: 5px 0 6px 0;
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

const CategoryBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  color: var(--title-color);
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
`;

const DetailsButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #1d4ed8;
  }
`;
