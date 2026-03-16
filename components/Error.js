import styled from "styled-components";

export default function Error({ message, onRetry }) {
  return (
    <Wrapper>
      <ErrorCard>
        <Icon>⚠️</Icon>

        <Title>Something went wrong</Title>

        <Message>{message || "Unable to load data. Please try again."}</Message>

        {onRetry && <RetryButton onClick={onRetry}>🔄 Try again</RetryButton>}
      </ErrorCard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
`;

const ErrorCard = styled.div`
  background: white;
  padding: 40px 45px;
  border-radius: 14px;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 420px;
  width: 100%;
`;

const Icon = styled.div`
  font-size: 46px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 22px;
  color: #222;
`;

const Message = styled.p`
  margin: 0 0 22px 0;
  font-size: 15px;
  color: #666;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0497ff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
