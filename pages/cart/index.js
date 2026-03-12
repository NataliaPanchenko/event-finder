import Cart from "@/components/Cart/Cart";

export default function CartPage({ cartItems, setCartItems }) {
  return <Cart cartItems={cartItems} setCartItems={setCartItems} />;
}
