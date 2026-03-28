import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <ContentWrapper>
        <p>© 2026 Event Finder. All rights reserved.</p>
        <Links>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </Links>
      </ContentWrapper>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--main-color);
  opacity: 0.8;
  color: var(--white-color);
  padding: 15px 15px;
  text-align: center;
  box-shadow: var(--footer-shadow);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--white-color);
  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  a {
    text-decoration: underline;
    font-size: 14px;
    transition: color 0.2s ease;
  }
  p {
    text-decoration: underline;
    cursor: pointer;
  }
`;
