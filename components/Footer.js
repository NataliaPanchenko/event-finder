import styled from "styled-components";

export default function Footer() {
  return <StyledFooter>© 2026 Event Finder. All rights reserved.</StyledFooter>;
}

const StyledFooter = styled.footer`
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: #888;
  position: fixed;
  bottom: 0;
  display: flex;
  left: -50%;
  transform: translateX(50%);
`;
