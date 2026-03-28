import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
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

export default function EventItem({ event, onClick }) {
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
        <TextContent>
          <Title>{event.title}</Title>
          <DateText>
            <Calendar size={16} /> <Text>{getDate(event.date)}</Text>
          </DateText>
          <Location>
            <MapPin size={16} />{" "}
            <Text> {event.location?.name || "Unknown location"}</Text>
          </Location>
          <CardFooter>
            <Price>€{event.price}</Price>
            <DetailsButton>View Details</DetailsButton>
          </CardFooter>
        </TextContent>
      </Content>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  height: 400px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-box-shadow);
  background-color: var(--surface-color);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  position: relative;
  &:hover {
    box-shadow: var(--box-shadow);
  }
  @media (max-width: 600px) {
    height: 380px;
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
  padding: 0;
`;

const TextContent = styled.div`
  padding: 20px;
`;

const DateText = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-color);
  margin: 10px 0 4px 0;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 5px 0 16px 0;
  color: var(--item-title-text);
`;

const Location = styled.p`
  display: flex;
  align-items: center;
  display: flex;
  gap: 5px;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: var(--text-color);
  margin: 0 0 4px 0;
`;

const Text = styled.span`
  font-size: 14px;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--category-background);
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: var(--category-shadow);
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
  color: var(--main-color);
  position: absolute;
  bottom: 25px;
  left: 20px;
`;

const DetailsButton = styled.button`
  background: var(--main-color);
  color: var(--white-color);
  border: none;
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  position: absolute;
  bottom: 25px;
  right: 20px;
  &:hover {
    background: var(--main-hover-color);
  }
`;
