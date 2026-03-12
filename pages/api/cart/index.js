import Cart from "@/pages/cart";

export default function CartPage({ cartItems, setCartItems }) {
  return <Cart cartItems={cartItems} setCartItems={setCartItems} />;
}
