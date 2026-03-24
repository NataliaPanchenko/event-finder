import { SearchIcon } from "lucide-react";
import styled from "styled-components";

export default function SearchEvents({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}) {
  const priceRanges = [
    "All prices",
    "Free - €25",
    "€25 - €75",
    "€75 - €150",
    "€150+",
  ];
  return (
    <Wrapper>
      <InputWrapper>
        <StyledIcon size={20} />
        <SearchInput
          placeholder="Search events..."
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputWrapper>

      <FilterSection>
        <FilterTitle>Category</FilterTitle>
        <CategoryWrapper>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <CategoryButton
                key={category._id}
                active={selectedCategory === category._id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category._id ? null : category._id
                  )
                }
              >
                {category.name}
              </CategoryButton>
            ))}
        </CategoryWrapper>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Price Range</FilterTitle>
        <PriceSelect
          value={selectedPrice}
          onChange={(event) => setSelectedPrice(event.target.value)}
        >
          {priceRanges.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </PriceSelect>
      </FilterSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 15px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  width: 90%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 10px;
  color: #555;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 35px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  margin-bottom: 10px;
  outline: none;
  font-size: 14px;
  &:focus {
    border-color: #4b4cfa;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 13px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryButton = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  background: ${({ active }) => (active ? "#3872ff" : "#f1f3f5")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${({ active }) => (active ? "#2c5adf" : "#e2e5e8")};
  }
`;

const PriceSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #4b4cfa;
  }
`;
