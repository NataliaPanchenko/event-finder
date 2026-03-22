import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <ContentWrapper>
        <p>© 2026 Event Finder. All rights reserved.</p>
        <Links>
          <p href="/">Terms of Service</p>
          <p href="/">Privacy Policy</p>
        </Links>
      </ContentWrapper>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #5b5b5b, #6e6e6e, #7f7f7f);
  opacity: 0.8;
  color: #fff;
  padding: 15px 15px;
  text-align: center;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

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
    color: #fff;
    text-decoration: underline;
    font-size: 14px;
    transition: color 0.2s ease;
    &:hover {
      color: #ffea00;
    }
  }
  p {
    text-decoration: underline;
    cursor: pointer;
  }
`;
