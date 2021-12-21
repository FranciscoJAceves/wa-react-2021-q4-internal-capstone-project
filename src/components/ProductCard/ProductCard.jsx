import PropTypes from "prop-types";
import { useCart } from "../../contexts/CartContext";
import { NAVIGATION, PRICE_FORMATTER } from "../../utils/constants";
import {
  ProductImage,
  ProductName,
  ProductPrice,
  ProductCategory,
  AddToCart,
  ProductInfo,
  ProductContent,
  ContentLeft,
  ContentRight,
} from "./ProductCard.styled";

function ProductCard({ product, category, large }) {
  const { cart, addItem } = useCart();
  const { id, data } = product;

  const cartItem = cart.find(({ item }) => item.id === product.id);
  const disabledButton = cartItem?.quantity >= cartItem?.item.data.stock;

  return (
    <div>
      <ProductContent to={`${NAVIGATION.SHOP}/${id}`}>
        <ContentLeft>
          <ProductImage src={data.mainimage.url} alt={data.name} />
          <ProductInfo>
            <ProductCategory>{category}</ProductCategory>
            <ProductName>{data.name}</ProductName>
            <ProductPrice>{PRICE_FORMATTER.format(data.price)}</ProductPrice>
          </ProductInfo>
        </ContentLeft>
        {large && <ContentRight>{data.short_description}</ContentRight>}
      </ProductContent>
      <AddToCart disabled={disabledButton} onClick={() => addItem(product, 1)}>
        Add to Cart
      </AddToCart>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      mainimage: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.string,
      price: PropTypes.number,
      short_description: PropTypes.string,
    }),
  }).isRequired,
  category: PropTypes.string.isRequired,
  large: PropTypes.bool,
};

ProductCard.defaultProps = {
  large: false,
};

export default ProductCard;
