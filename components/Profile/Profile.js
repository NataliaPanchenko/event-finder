import styled from "styled-components";

export default function Profile({ user }) {
  console.log("user", user);
  return (
    <Wrapper>
      <Sidebar>
        <AvatarBlock>
          <Avatar src={user.image} />
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </AvatarBlock>

        <Stats>
          <StatBox>
            <StatNumber>4</StatNumber>
            <StatLabel>Orders</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>8</StatNumber>
            <StatLabel>Tickets</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>$403.5</StatNumber>
            <StatLabel>Spent</StatLabel>
          </StatBox>
        </Stats>

        <Menu>
          <MenuItem active>Profile Info</MenuItem>
          <MenuItem>My Orders</MenuItem>
          <Logout>Logout</Logout>
        </Menu>
      </Sidebar>

      <Content>
        <Header>
          <Title>Profile Information</Title>
          <EditButton>Edit</EditButton>
        </Header>

        <Section>
          <SectionTitle>Personal Information</SectionTitle>

          <Row>
            <Field>
              <Label>First Name</Label>
              <Value>John</Value>
            </Field>

            <Field>
              <Label>Last Name</Label>
              <Value>Doe</Value>
            </Field>
          </Row>
        </Section>

        <Section>
          <SectionTitle>Contact Information</SectionTitle>

          <Field>
            <Label>Email Address</Label>
            <Value>john.doe@example.com</Value>
          </Field>

          <Field>
            <Label>Phone Number</Label>
            <Value>+1 (555) 123-4567</Value>
          </Field>

          <Field>
            <Label>Location</Label>
            <Value>San Francisco, CA</Value>
          </Field>
        </Section>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
  }
`;

const AvatarBlock = styled.div`
  text-align: center;
`;

const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const Name = styled.h2`
  margin-top: 15px;
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Email = styled.p`
  color: gray;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const StatBox = styled.div`
  flex: 1;
  background: #f3f4f6;
  border-radius: 12px;
  text-align: center;
  padding: 10px;
`;

const StatNumber = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: gray;
`;

const Menu = styled.div`
  margin-top: 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const MenuItem = styled.div`
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  background: ${(props) =>
    props.active ? "linear-gradient(90deg,#4f46e5,#9333ea)" : "#f3f4f6"};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
`;

const Logout = styled.div`
  margin-top: 10px;
  color: red;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Title = styled.h2``;

const EditButton = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  flex: 1;
  background: #f9fafb;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: gray;
`;

const Value = styled.div`
  margin-top: 5px;
  font-weight: 500;
`;
