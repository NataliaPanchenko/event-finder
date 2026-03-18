import styled from "styled-components";
import Link from "next/link";

export default function NoElements({ icon, title, description }) {
  return (
    <EmptyCart>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ButtonLink href="/">Browse Events</ButtonLink>
    </EmptyCart>
  );
}

const EmptyCart = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f2f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  svg {
    width: 36px;
    height: 36px;
    color: #9aa0a6;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: #6b7280;
  margin-bottom: 24px;
`;

const ButtonLink = styled(Link)`
  background: #2563eb;
  color: white;
  padding: 12px 28px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
  cursor: pointer;
  &:hover {
    background: #1d4ed8;
  }
`;
