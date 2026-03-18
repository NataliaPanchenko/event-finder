import EventsList from "@/components/EventsList/EventsList";
import styled from "styled-components";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SearchEvents from "@/components/SearchEvents/SearchEvents";
import { useState, useMemo } from "react";

export default function HomePage({ events, error, isLoading, categories }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    return events.filter((event) => {
      const searchText = (event.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const searchCategory =
        !selectedCategory || event.category._id === selectedCategory;

      console.log("selected category", selectedCategory);
      console.log("event.category._id", event.category._id);

      return searchText && searchCategory;
    });
  }, [events, search, selectedCategory]);

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
