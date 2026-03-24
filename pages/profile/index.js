import styled from "styled-components";
import Profile from "@/components/Profile/Profile";

export default function ProfilePage({ user, orders }) {
  return <Profile user={user} orders={orders} />;
}
