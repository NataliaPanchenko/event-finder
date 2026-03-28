import styled from "styled-components";

export default function SearchEvents({
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
  margin: 10px 0 20px 0;
  background: var(--white-color);
  padding: 20px;
  border-radius: 16px;
  width: 90%;
  box-shadow: var(--box-shadow);
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.p`
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--filter-color);
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryButton = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background: ${({ active }) =>
    active ? "var(--main-color)" : "var(--category-button-bg)"};
  color: ${({ active }) =>
    active ? "var(--white-color)" : "var(--category-button-color)"};
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${({ active }) =>
      active ? "var(--main-color)" : "var(--category-button-hover)"};
  }
`;

const PriceSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  border-radius: 12px;
  border: var(--input-border);
  background: var(--search-color);
  color: var(--black-color);
  font-size: 14px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: var(--main-color);
  }
`;
