import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}

const animate = keyframes`
  100% {
    background-size: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const Loader = styled.div`
  width: 120px;
  height: 20px;
  border-radius: 20px;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--loading-background);
  animation: ${animate} 2s infinite;
`;
