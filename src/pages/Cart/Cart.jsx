import QuantitySelector from "../../components/QuantitySelector";
import Table from "../../components/Table";
import { useCart } from "../../contexts/CartContext";
import { NAVIGATION, PRICE_FORMATTER } from "../../utils/constants";
import {
  CartContainer,
  CheckoutButton,
  CheckoutSection,
  NotFound,
  RemoveButton,
  Thumbnail,
  TotalLabel,
  TotalPrice,
} from "./Cart.styled";

export default function Cart() {
  const { cart, addItem, removeItem } = useCart();

  function handleQuantityChange(id, newValue) {
    const changedItem = cart.find(({ item }) => item.id === id);
    const difference = Math.abs(changedItem.quantity - newValue);
    if (newValue < changedItem.quantity) {
      removeItem(id, difference);
    } else if (newValue > changedItem.quantity) {
      addItem(changedItem.item, difference);
    }
  }

  const cartArray = cart.map(({ item: { id, data }, quantity }) => ({
    rowID: id,
    cellIDs: [
      `image${id}`,
      `name${id}`,
      `price${id}`,
      `quantity${id}`,
      `subtotal${id}`,
      `remove${id}`,
    ],
    data: [
      <Thumbnail src={data.mainimage.url} alt={data.name} />,
      data.name,
      PRICE_FORMATTER.format(data.price),
      <QuantitySelector
        defaultValue={quantity}
        minValue={1}
        maxValue={data.stock}
        onChange={(newValue) => handleQuantityChange(id, newValue)}
        dark
      />,
      PRICE_FORMATTER.format(data.price * quantity),
      <RemoveButton onClick={() => removeItem(id, quantity)}>X</RemoveButton>,
    ],
  }));

  const totalPrice = cart.reduce(
    (previous, current) =>
      previous + current.item.data.price * current.quantity,
    0
  );

  return (
    <CartContainer>
      {cart.length === 0 ? (
        <NotFound>The Cart is Empty</NotFound>
      ) : (
        <>
          <Table
            header={["Image", "Name", "Price", "Quantity", "Subtotal", ""]}
            content={cartArray}
          />

          <CheckoutSection>
            <TotalLabel>Total:</TotalLabel>
            <TotalPrice>{PRICE_FORMATTER.format(totalPrice)}</TotalPrice>
            <CheckoutButton to={NAVIGATION.CHECKOUT}>
              Go to Checkout
            </CheckoutButton>
          </CheckoutSection>
        </>
      )}
    </CartContainer>
  );
}
