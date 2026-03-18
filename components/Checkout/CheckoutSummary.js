import styled from "styled-components";
import { CircleCheck } from "lucide-react";

export default function CheckoutSummary({ cartItems }) {
  if (!cartItems) return <Wrapper>Loading...</Wrapper>;
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) => sum + item.eventId?.price * item.quantity,
        0
      )
    : 0;
  const serviceFee = +(subtotal * 0.03).toFixed(2);
  const total = subtotal + serviceFee;

  return (
    <Wrapper>
      <Title>Order Summary</Title>

      <Item>
        {cartItems.map((item) => (
          <ItemWrapper key={item._id}>
            <ItemTitle>{item.eventId.title}</ItemTitle>
            <ItemSubWrapper>
              <ItemSub>
                {item.quantity} × €{item.eventId.price}
              </ItemSub>
              <ItemSubPrice>€{item.quantity * item.eventId.price}</ItemSubPrice>
            </ItemSubWrapper>
          </ItemWrapper>
        ))}
      </Item>
      <Row>
        <Subtotal>Subtotal</Subtotal>
        <Price>€{subtotal}</Price>
      </Row>
      <Row>
        <Subtotal>Service Fee (3%)</Subtotal>
        <Price>€{serviceFee}</Price>
      </Row>

      <Divider />
      <Total>
        <TotalText>Total</TotalText>
        <TotalPrice>€{total}</TotalPrice>
      </Total>

      <Benefits>
        <BenefitItem>
          <Circle size="16" /> <BenefitText>Instant confirmation</BenefitText>
        </BenefitItem>
        <BenefitItem>
          <Circle size="16" />{" "}
          <BenefitText>Free cancellation up to 24h</BenefitText>
        </BenefitItem>
        <BenefitItem>
          <Circle size="16" /> <BenefitText>24/7 customer support</BenefitText>
        </BenefitItem>
      </Benefits>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Item = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemSubWrapper = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemSub = styled.p`
  font-size: 13px;
  color: #777;
`;

const ItemSubPrice = styled.p`
  font-size: 13px;
  color: black;
  font-weight: 600;
`;

const ItemTitle = styled.p`
  font-weight: 500;
  margin: 0;
`;

const Subtotal = styled.div`
  font-size: 16px;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
  color: #555;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #eee;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 20px;
`;

const TotalText = styled.p`
  margin: 0;
`;

const TotalPrice = styled.span`
  background: linear-gradient(135deg, #4c54fc, #8b2afa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

const Benefits = styled.div`
  background: #eff6ff;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  color: #4346b1;
  border: 1px solid #bfc2ff;
`;

const BenefitItem = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  justify-content: flex-start;
  margin: 0;
`;

const BenefitText = styled.p`
  margin: 4px 0;
`;

const Circle = styled(CircleCheck)`
  color: #2b5eeb;
`;
