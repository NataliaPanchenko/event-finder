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
  min-height: 60vh;
`;

const Loader = styled.div`
  width: 120px;
  height: 20px;
  border-radius: 20px;

  background:
    repeating-linear-gradient(135deg, #f03355 0 10px, #ffa516 0 20px) 0 / 0%
      no-repeat,
    repeating-linear-gradient(135deg, #ddd 0 10px, #eee 0 20px) 0 / 100%;

  animation: ${animate} 2s infinite;
`;
