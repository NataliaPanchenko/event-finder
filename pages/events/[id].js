import { getDate } from "@/components/EventsList/EventItem/EventItem";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { mutate } from "swr";
import getEventById from "@/services/eventService";
import { useState } from "react";

export default function EventPage({ event }) {
  if (!event) return <h2>Event not found</h2>;

  async function handleAddToCart(title) {
    const item = {
      eventId: event._id,
      title: event.title,
      price: event.price,
      quantity: 1,
    };

    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    mutate("/api/cart");
  }

  return (
    <PageContainer>
      <Card>
        <Title>{event.title}</Title>
        <ImageWrapper>
          <Image
            src={"/event-img.jpg"}
            alt={event.title}
            width="200"
            height="150"
          />
        </ImageWrapper>
        <Meta>
          <DateText>{getDate(event.date)}</DateText>
          <Location>
            <MapPin size={12} />
            {event.location?.name}
          </Location>
          <CategoryText>{event.category?.name}</CategoryText>
        </Meta>
        <Description>{event.description}</Description>
        <Tickets>
          <Price>€{event.price}</Price>
          <Available>Available: {event.availableTickets}</Available>
        </Tickets>
        <AddButton onClick={() => handleAddToCart(event.title)}>
          🎫 Buy Tickets
        </AddButton>
        <BackLink href="/">← Back to Homepage</BackLink>
      </Card>
    </PageContainer>
  );
}

export async function getServerSideProps({ params }) {
  const event = await getEventById(params.id);
  if (!event) return { notFound: true };

  return { props: { event } };
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 0 8px 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #222;
`;

const Meta = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const DateText = styled.span`
  font-size: 0.95rem;
  color: #555;
`;

const Location = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-color);
  margin: 0;
`;

const CategoryText = styled.span`
  font-size: 0.95rem;
  color: #555;
  text-transform: uppercase;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
`;

const Tickets = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111;
`;

const Available = styled.span`
  font-size: 0.95rem;
  color: #666;
`;

const BackLink = styled(Link)`
  font-size: 0.95rem;
  color: #0070f3;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AddButton = styled.button`
  width: 150px;
  padding: 12px 0;
  background-color: #0070f3;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  border: none;
  &:hover {
    background-color: rgb(4, 151, 255);
  }
`;
