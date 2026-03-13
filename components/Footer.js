import styled from "styled-components";

export default function Footer() {
  return <StyledFooter>© 2026 Event Finder. All rights reserved.</StyledFooter>;
}

const StyledFooter = styled.footer`
  text-align: center;
  padding: 8px 0;
  font-size: 13px;
  color: #888;
  width: 100%;
  background: white;
`;
