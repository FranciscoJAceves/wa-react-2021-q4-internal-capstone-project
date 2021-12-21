import PropTypes from "prop-types";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import {
  AddToCartButton,
  AddToCartContainer,
  AddToCartInput,
  InputLabel,
} from "./AddToCartForm.styled";

function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState();
  const { cart, addItem } = useCart();

  const cartItem = cart.find(({ item }) => item.id === product.id);
  const disabledButton = cartItem?.quantity >= cartItem?.item.data.stock;

  return (
    <AddToCartContainer>
      <AddToCartInput>
        <InputLabel htmlFor="item_quantity">Qty.:</InputLabel>
        <QuantitySelector
          inputName="item_quantity"
          inputID="item_quantity"
          maxValue={product.data.stock}
          onChange={setQuantity}
        />
      </AddToCartInput>
      <AddToCartButton
        disabled={disabledButton}
        onClick={() => addItem(product, quantity)}
      >
        Add to Cart
      </AddToCartButton>
    </AddToCartContainer>
  );
}

AddToCartForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      stock: PropTypes.number,
    }),
  }).isRequired,
};

export default AddToCartForm;
