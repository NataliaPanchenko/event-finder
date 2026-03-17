import { useState } from "react";
import styled from "styled-components";
import {
  Lock,
  Shield,
  User,
  Mail,
  Phone,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";

export default function SecureCheckout() {
  const [payment, setPayment] = useState("card");

  const options = [
    {
      id: "card",
      title: "Credit / Debit Card",
      sub: "Visa, Mastercard, Amex",
      icon: CreditCard,
      gradient: "linear-gradient(135deg, #3872ff, #4b4cfa)",
    },
    {
      id: "apple",
      title: "Apple Pay",
      sub: "Fast & secure",
      icon: Smartphone,
      gradient: "linear-gradient(135deg, #1c2636, #131c2c)",
    },
    {
      id: "google",
      title: "Google Pay",
      sub: "Quick checkout",
      icon: Wallet,
      gradient: "linear-gradient(135deg, #00bc64, #00a081)",
    },
    {
      id: "paypal",
      title: "PayPal",
      sub: "Trusted worldwide",
      icon: Wallet,
      gradient: "linear-gradient(135deg, #1558f7, #144bea)",
    },
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

      <SectionTitle>
        <UserIcon size="20" />
        <SectionTitleText>Contact Information</SectionTitleText>
      </SectionTitle>

      <Grid>
        <InputTitle>First Name *</InputTitle>
        <Input placeholder="John" />
      </Grid>

      <Grid>
        <InputTitle>Last Name *</InputTitle>
        <Input placeholder="Doe" />
      </Grid>

      <Grid>
        <InputWrapper>
          <Mail size="15" />
          <InputTitle>Email Adress *</InputTitle>
        </InputWrapper>
        <Input placeholder="john.doe@example.com" />
      </Grid>

      <Grid>
        <InputWrapper>
          <Phone size="15" />
          <InputTitle>Phone Number *</InputTitle>
        </InputWrapper>
        <Input placeholder="+1 (555) 123-4567" />
      </Grid>

      <Divider />

      <SectionTitle>
        <WalletIcon size="20" />
        <SectionTitleText>Payment Method</SectionTitleText>
      </SectionTitle>

      <Grid>
        {options.map((opt) => {
          const IconComponent = opt.icon;
          return (
            <Card
              key={opt.id}
              active={payment === opt.id}
              onClick={() => setPayment(opt.id)}
            >
              <IconPayment style={{ background: opt.gradient }}>
                <IconComponent size="25" />
              </IconPayment>
              <div>
                <CardTitle>{opt.title}</CardTitle>
                <CardSub>{opt.sub}</CardSub>
              </div>
            </Card>
          );
        })}
      </Grid>

      <SecurityText>
        <ShieldIcon size="15" /> All payments are secured with industry-standard
        encryption
      </SecurityText>

      <PayButton>
        <PayIcon size="20" />
        <PayText>Complete Payment - $26.25</PayText>
      </PayButton>

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  font-weight: 700;
  margin: 0 0 5px 0;
`;

const Subtitle = styled.p`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  color: #777;
  margin: 0;
  font-weight: 400;
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: 600;
`;

const SectionTitleText = styled.p`
  margin: 0;
`;

const UserIcon = styled(User)`
  color: #8b2afa;
`;

const WalletIcon = styled(Wallet)`
  color: #4c54fc;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const InputTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
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
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 14px;
  border: 2px solid ${({ active }) => (active ? "#a855f7" : "#e5e7eb")};
  background: ${({ active }) => (active ? "#faf5ff" : "#fff")};
  text-align: left;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border-color: #a855f7;
  }
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 4px;
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

const ShieldIcon = styled(Shield)`
  color: green;
  margin-right: 5px;
`;

const PayButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(90deg, #2679ff, #fc1a8b);
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const PayIcon = styled(Lock)`
  margin: 0;
`;

const PayText = styled.p`
  margin: 0;
`;

const IconPayment = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const Terms = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 20px;
  text-align: center;
  padding: 0 10px;
`;
