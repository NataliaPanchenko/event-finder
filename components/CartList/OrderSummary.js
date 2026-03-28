import styled from "styled-components";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceFeeValue } from "@/pages/_app";

export default function OrderSummary({ cartItems }) {
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) => sum + item.eventId?.price * item.quantity,
        0
      )
    : 0;
  const serviceFee = +(subtotal * serviceFeeValue).toFixed(2);
  const total = subtotal + serviceFee;

  return (
    <SummaryCard>
      <h3>Order Summary</h3>
      <Row>
        <span>Subtotal</span>
        <span>€{subtotal.toFixed(2)}</span>
      </Row>
      <Row>
        <span>Service Fee (0.5%)</span>
        <span>€{serviceFee.toFixed(2)}</span>
      </Row>
      <Divider />
      <TotalRow>
        <span style={{ color: "var(--black-color)" }}>Total</span>
        <span style={{ color: "var(--black-color)" }}>€{total.toFixed(2)}</span>
      </TotalRow>
      <CheckoutButton href="/checkout">
        Proceed to Checkout <ArrowRight size={18} />
      </CheckoutButton>
      <Continue href="/">Continue Shopping</Continue>
    </SummaryCard>
  );
}

const SummaryCard = styled.div`
  background: var(--white-color);
  border-radius: 14px;
  padding: 24px;
  height: fit-content;
  border: 1px solid var(--subtitile-color);
  @media (min-width: 1024px) {
    margin-top: 65px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  color: var(--icon-color);
`;

const TotalRow = styled(Row)`
  font-weight: 600;
  font-size: 18px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--search-bachground);
  margin: 16px 0;
`;

const CheckoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 20px;
  background: var(--main-color);
  color: var(--white-color);
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--icon-background);
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: var(--main-hover-color);
  }
`;

const Continue = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 16px;
  color: var(--main-color);
  text-decoration: none;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;
