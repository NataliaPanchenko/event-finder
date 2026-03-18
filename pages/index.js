import EventsList from "@/components/EventsList/EventsList";
import styled from "styled-components";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SearchEvents from "@/components/SearchEvents/SearchEvents";
import { useState, useMemo } from "react";
import NoElements from "@/components/NoElements";

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

      const searchPrice =
        !selectedPrice || selectedPrice === "All prices"
          ? true
          : selectedPrice === "Free - €25"
            ? event.price >= 0 && event.price <= 25
            : selectedPrice === "€25 - €75"
              ? event.price > 25 && event.price <= 75
              : selectedPrice === "€75 - €150"
                ? event.price > 75 && event.price <= 150
                : selectedPrice === "€150+"
                  ? event.price > 150
                  : true;

      return searchText && searchCategory && searchPrice;
    });
  }, [events, search, selectedCategory, selectedPrice]);

  if (isLoading) return <Loading />;
  if (error) {
    return <Error />;
  }

  console.log(events[0]);
  console.log(search);
  console.log(filteredEvents);

  return (
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
