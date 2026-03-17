import { useState } from "react";
import styled from "styled-components";
import { Lock, Shield } from "lucide-react";

export default function SecureCheckout() {
  const [payment, setPayment] = useState("card");

  const options = [
    { id: "card", title: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
    { id: "apple", title: "Apple Pay", sub: "Fast & secure" },
    { id: "google", title: "Google Pay", sub: "Quick checkout" },
    { id: "paypal", title: "PayPal", sub: "Trusted worldwide" },
  ];

  return (
    <Wrapper>
      <Header>
        <Icon>
          <Lock size="25" />
        </Icon>
        <SecuredWrapper>
          <Title>Secure Checkout</Title>
          <Subtitle>
            <Shield size="14" />
            Your information is protected
          </Subtitle>
        </SecuredWrapper>
      </Header>

      <SectionTitle>Contact Information</SectionTitle>

      <Grid>
        <Input placeholder="John" />
        <Input placeholder="Doe" />
      </Grid>

      <Grid>
        <Input placeholder="john.doe@example.com" />
        <Input placeholder="+1 (555) 123-4567" />
      </Grid>

      <Divider />

      <SectionTitle>Payment Method</SectionTitle>

      <Grid>
        {options.map((opt) => (
          <Card
            key={opt.id}
            active={payment === opt.id}
            onClick={() => setPayment(opt.id)}
          >
            <CardTitle>{opt.title}</CardTitle>
            <CardSub>{opt.sub}</CardSub>
          </Card>
        ))}
      </Grid>

      <SecurityText>
        <Shield size="15" /> All payments are secured with industry-standard
        encryption
      </SecurityText>

      <PayButton>Complete Payment - $26.25</PayButton>

      <Terms>
        By completing this purchase, you agree to our Terms of Service and
        Privacy Policy
      </Terms>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const SecuredWrapper = styled.div`
  margin: 0;
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4c54fc, #8b2afa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  color: #777;
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  outline: none;

  &:focus {
    border-color: #a855f7;
  }
`;

const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #eee;
`;

const Card = styled.button`
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${({ active }) => (active ? "#a855f7" : "#e5e7eb")};
  background: ${({ active }) => (active ? "#faf5ff" : "#fff")};
  text-align: left;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #a855f7;
  }
`;

const CardTitle = styled.div`
  font-weight: 500;
`;

const CardSub = styled.div`
  font-size: 13px;
  color: #777;
`;

const SecurityText = styled.p`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(90deg, #3b82f6, #ec4899);
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Terms = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 12px;
  text-align: center;
`;
