import styled from "styled-components";
import { SearchIcon } from "lucide-react";

export default function HeroHeader({ search, setSearch }) {
  return (
    <HeroSection>
      <HeroContent>
        <Title>Discover Amazing Events</Title>
        <Subtitle>
          Find and book tickets for concerts, sports, theater, and more
        </Subtitle>
        <SearchWrapper>
          <StyledIcon size={20} />
          <SearchInput
            placeholder="Search for events..."
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <SearchButton>Search</SearchButton>
        </SearchWrapper>
      </HeroContent>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  background: var(--hero-gradient);
  color: var(--white-color);
  padding: 20px 20px 50px 20px;
  text-align: center;
  @media (max-width: 768px) {
    padding: 60px 15px 40px 15px;
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--subtitile-color);
  margin-bottom: 30px;
  color: var(--desc-color);
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  position: relative;
  width: 100%;
  margin: 0 auto 10px auto;
  max-width: 500px;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SearchInput = styled.input`
  padding: 12px 20px 12px 40px;
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  background: var(--white-color);
  color: #333;
  &:focus {
    outline: 2px solid var(--search-outline);
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: var(--white-color);
  color: var(--search-button);
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500px;
  transition: background 0.2s;
  &:hover {
    background-color: var(--search-bachground);
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 10px;
  color: var(--icon-color);
`;
