import styled from "styled-components";
import { CircleQuestionMark } from "lucide-react";

export default function NoResults({ text = "Nothing here yet", children }) {
  return (
    <EmptyCart>
      <IconWrapper>
        <CircleQuestionMark size={30} />
      </IconWrapper>
      <NoOrdersTitle>{text}</NoOrdersTitle>
      {children}
    </EmptyCart>
  );
}

const EmptyCart = styled.div`
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
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

const NoOrdersTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;
