import { useCart } from "../../contexts/CartContext";
import CartSVG from "../../images/cart.svg";
import CartIconContainer from "./CartIcon.styled";

export default function CartIcon() {
  const { cart } = useCart();

  let itemsQuantity = 0;
  cart.forEach(({ quantity }) => {
    itemsQuantity += quantity;
  });

  return (
    <CartIconContainer>
      <img src={CartSVG} alt="Cart" />
      {itemsQuantity === 0 || (
        <span id="badge">{itemsQuantity < 100 ? itemsQuantity : "99+"}</span>
      )}
    </CartIconContainer>
  );
}
