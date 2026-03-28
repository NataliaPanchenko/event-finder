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
  ParkingSquare,
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
  const serviceFee = +(subtotal * 0.005).toFixed(2);
  const total = subtotal + serviceFee;

  const totalTickets = (cartItems || []).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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
        phone: values["phone"],
      },
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
      mutate("/api/orders");
      mutate("/api/cart");
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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [checkoutMessage, router]);

  const options = [
    {
      id: "card",
      title: "Credit / Debit Card",
      sub: "Visa, Mastercard, Amex",
      icon: CreditCard,
      background: "var(--main-color)",
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
      icon: ParkingSquare,
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
              <CheckCircle2 size="30" />
            </SuccessIcon>
            <SuccessTitle>Order Confirmed!</SuccessTitle>
            <SuccessText>
              Thank you for your purchase! Your tickets have been sent to your
              email.
            </SuccessText>

            <ButtonGroup>
              <HomeButton onClick={() => router.push("/")}>
                Back to Home
              </HomeButton>
              <EventsButton onClick={() => router.push("/favorites")}>
                View My Events
              </EventsButton>
            </ButtonGroup>
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
          <Field>
            <InputTitle>First Name *</InputTitle>
            <Input
              placeholder="John"
              id="first-name"
              name="first-name"
              type="text"
              required
            />
          </Field>

          <Field>
            <InputTitle>Last Name *</InputTitle>
            <Input
              placeholder="Doe"
              name="last-name"
              id="last-name"
              type="text"
              required
            />
          </Field>
        </Grid>

        <Grid>
          <Field>
            <InputWrapper>
              <Mail size="15" />
              <InputTitle>Email Address *</InputTitle>
            </InputWrapper>
            <Input
              placeholder="john.doe@example.com"
              name="email"
              id="email"
              type="email"
              required
            />
          </Field>

          <Field>
            <InputWrapper>
              <Phone size="15" />
              <InputTitle>Phone Number *</InputTitle>
            </InputWrapper>
            <Input
              placeholder="+1 (555) 123-4567"
              name="phone"
              id="phone"
              required
            />
          </Field>
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
                <IconPayment
                  style={{ background: option.gradient || option.background }}
                >
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

        <PayButton type="submit" disabled={loading}>
          <PayIcon size="20" />
          <PayText>
            {loading ? (
              <>Processing...</>
            ) : (
              `Complete Payment - € ${total.toFixed(2)}`
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
  background: var(--surface-color);
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px var(--overlay-checkout);
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
  background-color: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white-color);
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
  color: var(--date-row-color);
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
  color: var(--main-color);
`;

const WalletIcon = styled(Wallet)`
  color: var(--main-color);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  border: 1px solid var(--category-button-hover);
  background: var(--search-input-bg);
  color: var(--black-color);
  outline: none;
  &:focus {
    border-color: var(--main-color);
  }
`;

const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid var(--delete-bg);
`;

const Card = styled.button`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 14px;
  border: 2px solid
    ${({ active }) =>
      active ? "var(--main-color)" : "var(--category-button-hover)"};
  background: ${({ active }) =>
    active ? "var(--payment-bg)" : "var(--payment-color)"};
  text-align: left;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border-color: var(--main-hover-color);
  }
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 4px;
`;

const CardSub = styled.div`
  font-size: 13px;
  color: var(--date-row-color);
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
  color: var(--white-color);
  background-color: var(--main-color);
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
  color: var(--white-color);
  font-size: 20px;
`;

const Terms = styled.p`
  font-size: 12px;
  color: var(--logout-text);
  margin-top: 20px;
  text-align: center;
  padding: 0 10px;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--overlay-checkout);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const CheckoutMessage = styled.div`
  background: var(--surface-color);
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  width: 380px;
  box-shadow: var(--button-shadow);
  animation: fadeIn 0.3s ease;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--success-bg);
  color: var(--success-title);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

const SuccessTitle = styled.h2`
  color: var(--black-color);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const SuccessText = styled.p`
  font-size: 14px;
  color: var(--icon-color);
  margin-bottom: 25px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HomeButton = styled.button`
  background: var(--item-title-color);
  color: var(--white-color);
  padding: 12px 0;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;

const EventsButton = styled.button`
  background: var(--surface-color);
  color: var(--item-title-color);
  padding: 12px 0;
  border-radius: 12px;
  border: 1px solid var(--delete-bg);
  font-weight: 600;
  cursor: pointer;
`;
