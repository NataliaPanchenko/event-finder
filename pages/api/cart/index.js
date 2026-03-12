import Cart from "@/pages/cart";
import Link from "next/link";

export default function CartPage({ cartItems, setCartItems }) {
  return <Cart cartItems={cartItems} setCartItems={setCartItems} />;
}
