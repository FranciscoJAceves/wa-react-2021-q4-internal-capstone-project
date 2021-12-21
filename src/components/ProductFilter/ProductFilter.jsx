import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router";
import { NAVIGATION } from "../../utils/constants";
import Grid from "../Grid";
import Loading from "../Loading";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard";
import {
  FilterButton,
  FilterDivider,
  ProductFilterContent,
  ProductFilterSidebar,
} from "./ProductFilter.styled";

function ProductFilter({ categories, products }) {
  const { filter = [] } = useLocation().state || {};
  const clearFilters = { id: "-", data: { name: "Clear Filters" } };

  let filterButtons;
  if (!categories.isLoading) {
    const categoriesArray =
      filter.length > 0
        ? [clearFilters, ...categories.data.results]
        : [...categories.data.results];

    filterButtons = categoriesArray.map(({ id, data: { name } }, index) => {
      const state = { page: 1 };
      if (id === clearFilters.id) {
        state.filter = [];
      } else if (filter.includes(id)) {
        const indexToRemove = filter.indexOf(id);
        state.filter = [
          ...filter.slice(0, indexToRemove),
          ...filter.slice(indexToRemove + 1),
        ];
      } else {
        state.filter = [...filter, id];
      }

      return (
        <React.Fragment key={id}>
          <FilterButton
            key={`button${id}`}
            to={NAVIGATION.SHOP}
            state={state}
            active={filter.includes(id) ? 1 : undefined}
          >
            {name}
          </FilterButton>
          {index + 1 !== categoriesArray.length ? (
            <FilterDivider key={`divider${id}`} />
          ) : null}
        </React.Fragment>
      );
    });
  }

  let productsList;
  if (!categories.isLoading && !products.isLoading) {
    let categoryNames = {};
    categories.data.results.forEach(({ id, data: { name } }) => {
      categoryNames = { ...categoryNames, [id]: name };
    });

    productsList = products.data.results.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        category={categoryNames[product.data.category.id]}
      />
    ));
  }

  return (
    <>
      {categories.isLoading ? (
        <Loading />
      ) : (
        <ProductFilterSidebar>{filterButtons}</ProductFilterSidebar>
      )}
      {categories.isLoading || products.isLoading ? (
        <Loading />
      ) : (
        <ProductFilterContent>
          <Grid>{productsList}</Grid>
          <Pagination
            navigation={NAVIGATION.SHOP}
            totalPages={products.data.total_pages}
            options={{ filter }}
          />
        </ProductFilterContent>
      )}
    </>
  );
}

ProductFilter.propTypes = {
  categories: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.shape({ name: PropTypes.string }),
        })
      ),
    }),
  }).isRequired,
  products: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape({
      total_pages: PropTypes.number,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.shape({
            category: PropTypes.shape({ id: PropTypes.string }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default ProductFilter;
