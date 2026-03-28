import EventsList from "@/components/EventsList/EventsList";
import styled from "styled-components";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SearchEvents from "@/components/SearchEvents/SearchEvents";
import { useState, useMemo } from "react";
import HeroHeader from "@/components/HeroHeader";

export default function HomePage({ events, error, isLoading, categories }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    return events.filter((event) => {
      const searchText = (event.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const searchCategory =
        !selectedCategory || event.category._id === selectedCategory;

      const getPriceMatch = (price, selectedPrice) => {
        switch (selectedPrice) {
          case "Free - €25":
            return price >= 0 && price <= 25;
          case "€25 - €75":
            return price > 25 && price <= 75;
          case "€75 - €150":
            return price > 75 && price <= 150;
          case "€150+":
            return price > 150;
          default:
            return true;
        }
      };

      const searchPrice = getPriceMatch(event.price, selectedPrice);

      return searchText && searchCategory && searchPrice;
    });
  }, [events, search, selectedCategory, selectedPrice]);

  if (isLoading) return <Loading />;
  if (error) {
    return <Error />;
  }

  return (
    <>
      <HeroHeader />
      <Wrapper>
        <Sidebar>
          <SearchEvents
            search={search}
            setSearch={setSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </Sidebar>
        <MainContent>
          <EventsList events={filteredEvents} />
        </MainContent>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 1200px;
  min-height: 100vh;
  display: flex;
  gap: 10px;
  margin: 0 auto;
  padding: 20px 10px;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Sidebar = styled.div`
  flex: 1 1 250px;
  min-width: 250px;
  @media (max-width: 900px) {
    margin-left: 20px;
    width: 100%;
  }
`;

const MainContent = styled.div`
  flex: 3 1 700px;
  min-width: 300px;
  @media (max-width: 900px) {
    margin: 0;
    width: 100%;
  }
`;
