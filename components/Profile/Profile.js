import styled from "styled-components";
import Loading from "../Loading";
import {
  LogOut,
  Mail,
  Package,
  User2,
  Calendar,
  Clock,
  CreditCard,
  Apple,
  Wallet,
  SquareParking,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import NoResults from "../NoResults";
import ToggleTheme from "../ToggleTheme";

export default function Profile({ user, orders }) {
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return <Loading />;
  }

  const userName = (user.name || "").split(" ");
  const firstName = userName[0] || "";
  const lastName = userName.slice(1).join(" ");

  const ticketsCount = Array.isArray(orders)
    ? orders.reduce((sum, order) => {
        const orderTickets = order.items?.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        return sum + orderTickets;
      }, 0)
    : 0;

  const ordersCount = Array.isArray(orders) ? orders.length : 0;

  const ticketsPrice = Array.isArray(orders)
    ? orders.reduce((sum, order) => sum + (order.total || 0), 0)
    : 0;

  const getDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPaymentMethod = (method) => {
    switch (method) {
      case "card":
        return (
          <OrderDate>
            <CreditCard size={15} /> Card
          </OrderDate>
        );
      case "apple":
        return (
          <OrderDate>
            <Apple size={15} /> Apple Pay
          </OrderDate>
        );
      case "google":
        return (
          <OrderDate>
            <Wallet size={15} /> Google Pay
          </OrderDate>
        );
      case "paypal":
        return (
          <OrderDate>
            <SquareParking size={15} /> PayPal
          </OrderDate>
        );
      default:
        return method || "—";
    }
  };

  return (
    <Wrapper>
      <Sidebar>
        <AvatarBlock>
          <Avatar src={user.image} />
          <Name>{user.name}</Name>
          <Email>
            <Mail size="15" color="grey" />
            {user.email}
          </Email>
        </AvatarBlock>

        <Stats>
          <StatBox>
            <StatNumber>{ordersCount.toFixed()}</StatNumber>
            <StatLabel>Orders</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>{ticketsCount.toFixed()}</StatNumber>
            <StatLabel>Tickets</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>€{ticketsPrice.toFixed()}</StatNumber>
            <StatLabel>Spent</StatLabel>
          </StatBox>
        </Stats>

        <Menu>
          <MenuItem
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          >
            {" "}
            <User2 size="20" />
            Profile Info
          </MenuItem>
          <MenuItem
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          >
            {" "}
            <Package size="20" />
            My Orders
          </MenuItem>
          <LogoutText onClick={() => signOut()}>
            <LogOut size="15" color="red" />
            Logout
          </LogoutText>
        </Menu>
      </Sidebar>

      <Content>
        {activeTab === "profile" && (
          <>
            <Header>
              <Title>Profile</Title>
            </Header>

            <Section>
              <SectionTitle>Personal Information</SectionTitle>

              <Row>
                <Field>
                  <Label>First Name</Label>
                  <Value>{firstName}</Value>
                </Field>

                <Field>
                  <Label>Last Name</Label>
                  <Value>{lastName}</Value>
                </Field>
              </Row>
            </Section>

            <Section>
              <SectionTitle>Contact Information</SectionTitle>

              <Field>
                <Label>
                  <Mail size="12" color="grey" /> &nbsp; Email Address
                </Label>
                <Value>{user.email}</Value>
              </Field>
            </Section>
          </>
        )}

        {activeTab === "orders" && (
          <Section>
            <SectionTitle>My Orders</SectionTitle>
            {orders?.length > 0 ? (
              orders.map((order) => {
                const totalTickets = order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <OrderCard key={order._id}>
                    <OrderHeader>
                      <div>
                        <OrderNumber>Order #{order._id.slice(-4)}</OrderNumber>
                        <OrderDate>
                          <Clock size={15} />
                          {getDate(order.createdAt)}
                        </OrderDate>
                      </div>
                      <RightHeader>
                        <PaymentMethod>
                          {formatPaymentMethod(order.paymentMethod)}
                        </PaymentMethod>
                        <OrderStatus>Confirmed</OrderStatus>
                      </RightHeader>
                    </OrderHeader>

                    {order.items.map((item) => (
                      <TicketRow key={item.eventId._id}>
                        <TicketInfo>
                          <TicketTitle>{item.eventId.title}</TicketTitle>
                          <TicketDetails>
                            <Calendar size={15} /> {getDate(item.eventId.date)}{" "}
                            • {item.eventId.location?.name}
                          </TicketDetails>
                        </TicketInfo>
                        <TicketQuantityPrice>
                          {item.quantity} × €
                          {item.eventId.price * item.quantity}
                        </TicketQuantityPrice>
                      </TicketRow>
                    ))}

                    <OrderFooter>
                      <PriceBlock>
                        <PriceRow>
                          <span>Tickets</span>
                          <span>€{order.subtotal ?? order.total}</span>
                        </PriceRow>

                        {order.serviceFee !== undefined && (
                          <PriceRow small>
                            <span style={{ color: "var(--main-color)" }}>
                              Service fee
                            </span>
                            <span>0.5%</span>
                          </PriceRow>
                        )}

                        <TotalRow>
                          <span>Total</span>
                          <span>€{order.total.toFixed(2)}</span>
                        </TotalRow>
                      </PriceBlock>
                    </OrderFooter>
                  </OrderCard>
                );
              })
            ) : (
              <NoResults text="No orders found" />
            )}
          </Section>
        )}
      </Content>
      <ToggleTheme />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
  min-height: 100vh;
  background: var(--search-input-bg);
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
  box-shadow: var(--sidebar-shadow);
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
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
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
  background: var(--search-input-bg);
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
  color: var(--gray-color);
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
  background: ${(props) => (props.active ? "var(--main-color)" : "#f5f5f5")};
  color: ${(props) =>
    props.active ? "var(--white-color)" : "var(--category-button-color)"};
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    background: ${(props) =>
      props.active ? "var(--main-color)" : "var(--icon-background)"};
  }
`;

const LogoutText = styled.div`
  margin: 30px 0 0 10px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: var(--logout-text);
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Content = styled.div`
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--sidebar-shadow);
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

const Title = styled.h3`
  margin-top: 20px;
  font-size: 20px;
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
  background: var(--search-input-bg);
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: var(--gray-color);
`;

const Value = styled.div`
  margin-top: 5px;
  font-weight: 500;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--subtitile-color);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const OrderNumber = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const OrderDate = styled.div`
  font-size: 12px;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OrderStatus = styled.div`
  background: var(--order-status-bg);
  color: var(--order-color);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
`;

const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid var(--delete-bg);
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketTitle = styled.div`
  font-weight: 600;
`;

const TicketDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--gray-color);
  margin-top: 5px;
`;

const TicketQuantityPrice = styled.div`
  text-align: right;
  font-weight: 500;
  @media (max-width: 600px) {
    text-align: left;
  }
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  font-weight: 600;
  font-size: 14px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid var(--delete-bg);
  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  color: ${(props) =>
    props.small ? "var(--price-row-color)" : "var(--category-button-color)"};
  width: 100%;
  max-width: 200px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  font-weight: 700;
  font-size: 16px;
  color: var(--main-color);
  width: 120px;
`;

const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const PaymentMethod = styled.div`
  font-size: 12px;
  color: var(--gray-color);
`;
