import styled from "styled-components";

export default function Checkout() {
  return (
    <Container>
      <h2>Checkout page</h2>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 20px;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;
