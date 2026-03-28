import styled from "styled-components";
import { User2 } from "lucide-react";

export default function Button({ onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <User2 size="15" />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: var(--main-color);
  color: var(--white-color);
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--main-hover-color);
  }
`;
