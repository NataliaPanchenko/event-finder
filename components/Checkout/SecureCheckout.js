import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mutate } from "swr";
import {
  Lock,
  Shield,
  User,
  Mail,
  Phone,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle2,
} from "lucide-react";

export default function SecureCheckout({ cartItems }) {
  const [payment, setPayment] = useState("card");
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const subtotal = (cartItems || []).reduce(
    (sum, item) => sum + item.eventId?.price * item.quantity,
    0
  );
  const serviceFee = +(subtotal * 0.03).toFixed(2);
  const total = subtotal + serviceFee;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());

    const order = {
      items: cartItems.map((item) => ({
        eventId: item.eventId._id,
        quantity: item.quantity,
      })),
      total,
      paymentMethod: payment,
      customer: {
        firstName: values["first-name"],
        lastName: values["last-name"],
        email: values["email"],
      },
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Failed to create order");

      setCheckoutMessage(true);
      event.target.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    const response = await fetch("/api/cart", {
      method: "DELETE",
    });

    if (response.ok) {
      mutate("/api/cart");
    } else {
      alert("Error clearing cart");
    }
  }

  useEffect(() => {
    if (checkoutMessage) {
      const timer = setTimeout(async () => {
        setCheckoutMessage(false);
        await clearCart();
        router.push("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [checkoutMessage]);

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

      {checkoutMessage && (
        <Overlay>
          <CheckoutMessage>
            <SuccessIcon>
              <CheckCircle2 size="25" />
            </SuccessIcon>
            <SuccessTitle>Payment Successful!</SuccessTitle>
            <SuccessText>Your tickets have been confirmed</SuccessText>
            <SuccessSubText>
              Check your email for confirmation details
            </SuccessSubText>

            <SummaryBox>
              <SummaryTotal>
                Order Total: <p>€{total.toFixed(2)}</p>
              </SummaryTotal>
              <SummaryTickets>Tickets: {cartItems.length}</SummaryTickets>
            </SummaryBox>

            <RedirectText>Redirecting you to home page...</RedirectText>
          </CheckoutMessage>
        </Overlay>
      )}

      <form onSubmit={handleSubmit}>
        <SectionTitle>
          <input type="hidden" name="paymentMethod" value={payment} />
          <UserIcon size="20" />
          <SectionTitleText>Contact Information</SectionTitleText>
        </SectionTitle>

        <Grid>
          <InputTitle name="first-name">First Name *</InputTitle>
          <Input
            placeholder="John"
            id="first-name"
            name="first-name"
            type="text"
            required
          />
        </Grid>

        <Grid>
          <InputTitle name="last-name">Last Name *</InputTitle>
          <Input
            placeholder="Doe"
            name="last-name"
            id="last-name"
            type="text"
            required
          />
        </Grid>

        <Grid>
          <InputWrapper>
            <Mail size="15" />
            <InputTitle name="email">Email Adress *</InputTitle>
          </InputWrapper>
          <Input
            placeholder="john.doe@example.com"
            name="email"
            id="email"
            type="email"
            required
          />
        </Grid>

        <Grid>
          <InputWrapper>
            <Phone size="15" />
            <InputTitle name="phone">Phone Number *</InputTitle>
          </InputWrapper>
          <Input
            placeholder="+1 (555) 123-4567"
            name="phone"
            id="phone"
            required
          />
        </Grid>

        <Divider />

        <SectionTitle>
          <WalletIcon size="20" />
          <SectionTitleText>Payment Method</SectionTitleText>
        </SectionTitle>

        <Grid>
          {options.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card
                key={option.id}
                type="button"
                active={payment === option.id}
                onClick={() => setPayment(option.id)}
              >
                <IconPayment style={{ background: option.gradient }}>
                  <IconComponent size="25" />
                </IconPayment>
                <div>
                  <CardTitle>{option.title}</CardTitle>
                  <CardSub>{option.sub}</CardSub>
                </div>
              </Card>
            );
          })}
        </Grid>

        <SecurityText>
          <ShieldIcon size="15" /> All payments are secured with
          industry-standard encryption
        </SecurityText>

        <PayButton type="submit" disabled={loading}>
          <PayIcon size="20" />
          <PayText>
            {loading ? (
              <>
                <Spinner /> Processing...
              </>
            ) : (
              `Complete Payment - €${total}`
            )}
          </PayText>
        </PayButton>
      </form>

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

const InputTitle = styled.label`
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
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const CheckoutMessage = styled.div`
  background: #f3f4f6;
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  width: 360px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const SuccessIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #16a34a;
  color: white;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: float 2s ease-in-out infinite;
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const SuccessTitle = styled.h2`
  color: #16a34a;
  margin-bottom: 10px;
`;

const SuccessText = styled.p`
  margin: 0;
  color: #444;
`;

const SuccessSubText = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
`;

const SummaryBox = styled.div`
  background: #d1fae5;
  border-radius: 14px;
  padding: 15px;
  margin-bottom: 20px;
  font-weight: 500;
  border: 1px solid #6ba86e;
`;

const SummaryTotal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px;
  color: #135416;
  font-weight: 500;
  p {
    font-weight: 300;
  }
  margin: 0;
`;

const SummaryTickets = styled.p`
  font-size: 14px;
  color: #165319;
  margin: 0;
  font-weight: 400;
`;

const RedirectText = styled.p`
  font-size: 13px;
  color: #777;
  font-weight: 400;
`;

const Spinner = styled.div`
  display: inline;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
