import { getDate } from "@/components/EventsList/EventItem/EventItem";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { MapPin } from "lucide-react";
import getEventById from "@/services/eventService";
import { useState } from "react";
import { Heart } from "lucide-react";
import { mutate } from "swr";

export default function EventPage({ event, favorites }) {
  const [addMessage, setAddMessage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  if (!event) return <h2>Event not found</h2>;

  const isFavorite = favorites?.some((fav) => fav.eventId._id === event._id);

  const handleFavorites = async () => {
    if (isFavorite) {
      await fetch(`/api/favorites/${event._id}`, { method: "DELETE" });
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event._id }),
      });
    }
    mutate("/api/favorites");
  };

  async function handleAddToCart(title) {
    const item = {
      eventId: event._id,
      title: event.title,
      price: event.price,
      quantity: 1,
    };
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      mutate("/api/cart");
      setAddMessage(`Ticket "${title}" added to cart ✨`);
      setTimeout(() => setAddMessage(""), 3000);
    } else {
      alert("Error. Please try again");
    }
  }

  return (
    <PageContainer>
      <Card>
        {addMessage && <Message>{addMessage}</Message>}
        <FavoriteIcon
          size="40"
          onClick={() => handleFavorites(event._id)}
          $active={isFavorite}
          fill={isFavorite ? "white" : "none"}
        />
        <Title>{event.title}</Title>
        <ImageWrapper onClick={() => setImageOpen(true)}>
          <Image
            src={event.image ? event.image : "/event-img.jpg"}
            alt={event.title}
            fill
          />
        </ImageWrapper>

        {imageOpen && (
          <ModalOverlay onClick={() => setImageOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={() => setImageOpen(false)}>✕</CloseButton>
              <ModalImage
                src={event.image ? event.image : "/event-img.jpg"}
                alt={event.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </ModalContent>
          </ModalOverlay>
        )}

        <Meta>
          <DateText>{getDate(event.date)}</DateText>
          <Location>
            <MapPin size={12} />
            {event.location?.name}
          </Location>
          <Category>{event.category?.name}</Category>
        </Meta>
        <Description>{event.description}</Description>
        <Tickets>
          <Price>€{event.price}</Price>
          <Available>Available: {event.availableTickets}</Available>
        </Tickets>
        <AddButton onClick={() => handleAddToCart(event.title)}>
          Add to cart
        </AddButton>
        <BackLink href="/">← Back to Events</BackLink>
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
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 70vh;
`;

const Card = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
`;

const FavoriteIcon = styled(Heart)`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: #f4f2f2;
  border-radius: 20px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "white" : "#555")};
  background-color: ${({ $active }) => ($active ? "#ff4d4d" : "#f4f2f2")};
`;

const Message = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #4caf50;
  color: var(--text-color);
  background-color: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  max-width: 600px;
  z-index: 100;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto 12px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  img {
    object-fit: cover;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 80%;
`;

const ModalImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 10px auto 20px auto;
  color: #222;
`;

const Meta = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
`;

const DateText = styled.span`
  font-size: 0.95rem;
  color: #555;
  display: flex;
  align-items: center;
`;

const Location = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.95rem;
  color: #555;
  margin: 0;
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
  width: 100%;
  padding: 12px 0;
  background-color: #0070f3;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 auto 15px auto;
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

const Category = styled.p`
  display: block;
  width: fit-content;
  background-color: rgba(129, 177, 255, 0.7);
  border-radius: 5px;
  font-size: 0.95rem;
  padding: 5px;
  color: rgb(26, 7, 123);
  margin: 0;
`;
