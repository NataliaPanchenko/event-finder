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
  height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 0;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--no-results-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  svg {
    width: 36px;
    height: 36px;
    color: var(--no-elements-icon);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: var(--no-elem-desc);
  margin-bottom: 24px;
`;

const ButtonLink = styled(Link)`
  background: var(--main-color);
  color: white;
  padding: 12px 28px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
  cursor: pointer;
  &:hover {
    background: var(--main-hover-color);
  }
`;
