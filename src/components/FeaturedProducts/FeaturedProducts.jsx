import PropTypes from "prop-types";
import { useState } from "react";
import { NAVIGATION } from "../../utils/constants";
import Grid from "../Grid";
import ProductCard from "../ProductCard";
import {
  FeaturedProductsHeader,
  FeaturedProductsOption,
  FeaturedProductsContainer,
  FeaturedProductsTitle,
  ViewAllButton,
} from "./FeaturedProducts.styled";

const ALL_CATEGORY_ID = "*";

function FeaturedProducts({
  title,
  categories,
  products,
  firstActiveCategoryId,
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    firstActiveCategoryId
  );

  const categoryControlList = [
    { id: ALL_CATEGORY_ID, name: "All" },
    ...categories,
  ];

  const categoryControls = categoryControlList.map(({ id, name }) => (
    <FeaturedProductsOption
      key={id}
      onClick={() => setActiveCategoryId(id)}
      active={id === activeCategoryId}
    >
      {name}
    </FeaturedProductsOption>
  ));

  let categoryNames = {};
  categories.forEach(({ id, name }) => {
    categoryNames = { ...categoryNames, [id]: name };
  });

  const productsList = products.data.results
    .filter(
      ({ data }) =>
        activeCategoryId === data.category.id ||
        activeCategoryId === ALL_CATEGORY_ID
    )
    .map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        category={categoryNames[product.data.category.id]}
      />
    ));

  return (
    <FeaturedProductsContainer>
      <FeaturedProductsHeader>
        <FeaturedProductsTitle>{title}</FeaturedProductsTitle>
        <div>{categoryControls}</div>
      </FeaturedProductsHeader>
      <Grid>{productsList}</Grid>
      <ViewAllButton to={NAVIGATION.SHOP}>View all products</ViewAllButton>
    </FeaturedProductsContainer>
  );
}

FeaturedProducts.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  products: PropTypes.shape({
    data: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.shape({
            category: PropTypes.shape({
              id: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
  firstActiveCategoryId: PropTypes.string,
};

FeaturedProducts.defaultProps = {
  firstActiveCategoryId: ALL_CATEGORY_ID,
};

export default FeaturedProducts;
