import styled from "styled-components";
import { User2 } from "lucide-react";

export default function Button({ text, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <User2 size="15" />
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: #3f58e9;
  color: white;
  display: flex;
  padding: 7px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
