import { getDate } from "@/components/EventsList/EventItem/EventItem";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { MapPin, Heart, Calendar, ShoppingCart } from "lucide-react";
import getEventById from "@/services/eventService";
import { useState } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function EventPage({ event, favorites }) {
  const [addMessage, setAddMessage] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  if (!event) return <h2>Event not found</h2>;

  const isFavorite = Array.isArray(favorites)
    ? favorites.some((fav) => fav.eventId._id === event._id)
    : false;

  const handleFavorites = async () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

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
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

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
      <BackLink href="/">← Back</BackLink>
      <Card>
        {addMessage && <Message>{addMessage}</Message>}
        <FavoriteIcon
          size={30}
          onClick={() => handleFavorites(event._id)}
          $active={isFavorite}
          fill={isFavorite ? "red" : "white"}
        />
        <ImageWrapper onClick={() => setImageOpen(true)}>
          <Image
            src={event.image ? event.image : "/event-img.jpg"}
            alt={event.title}
            fill
          />
          <Category>{event.category?.name}</Category>
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

        <Title>{event.title}</Title>

        <Meta>
          <DateText>
            <Calendar size={15} />
            {getDate(event.date)}
          </DateText>
          <Location>
            <MapPin size={15} />
            {event.location?.name}
          </Location>
        </Meta>
        <DescTitle>Description</DescTitle>
        <Description>{event.description}</Description>
        <Tickets>
          <Price>€{event.price}</Price>
          <Available>Available: {event.availableTickets}</Available>
        </Tickets>
        <AddButton onClick={() => handleAddToCart(event.title)}>
          <ShoppingCart size={17} />
          Add to cart
        </AddButton>
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
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 70vh;
`;

const Card = styled.div`
  position: relative;
  background-color: var(--white-color);
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: var(--card-box-shadow);
  max-width: 600px;
  width: 100%;
`;

const FavoriteIcon = styled(Heart)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 7px;
  background-color: var(--cart-controls-bg);
  border: ${({ $active }) =>
    $active ? "none" : "1px solid var(--icon-color)"};
  border-radius: 10px;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? "var(--dekete-color)" : "var(--icon-color)"};
  background-color: ${({ $active }) =>
    $active ? "var(--category-button-bg)" : "var(--category-button-bg)"};
`;

const Message = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid var(--success-color);
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
  width: 250px;
  height: 250px;
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
  background: var(--overlay-color);
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
  background: var(--icon-background);
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

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 30px auto 20px auto;
  color: var(--item-title-color);
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 30px;
`;

const DateText = styled.div`
  font-size: 0.95rem;
  color: var(--icon-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.95rem;
  color: var(--icon-color);
  margin: 0;
`;

const DescTitle = styled.span`
  padding: 4px 10px;
  font-size: 1rem;
  font-weight: 400px;
  border-radius: 20px;
  background-color: var(--icon-background);
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--descr-color);
  margin: 20px auto;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
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
  color: var(--black-color);
`;

const Available = styled.span`
  font-size: 0.95rem;
  color: var(--info-color);
`;

const BackLink = styled(Link)`
  align-self: flex-start;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: var(--black-color);
  font-weight: 500;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: var(--icon-background);
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: var(--main-color);
  color: var(--white-color);
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
    background-color: var(--main-hover-color);
  }
  &:active {
    border: 2px solid var(--white-color);
  }
`;

const Category = styled.p`
  position: absolute;
  top: 0;
  left: 10px;
  background: var(--category-background);
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: var(--category-shadow);
  color: var(--title-color);
`;
