import styled from "styled-components";

export default function Favorites({ events }) {
  return (
    <>
      <Container>
        <Header>
          <TitleBlock>
            <Title>Favorites</Title>
            {/* {quantityItems}
            {quantityItems === 1 ? ` item` : ` items`} in your cart */}
            ? favorite events
          </TitleBlock>
        </Header>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 1000px;
  margin: 20px;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 10px 0;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
