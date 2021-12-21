import { useLocation } from "react-router";
import Grid from "../../components/Grid";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import ProductCard from "../../components/ProductCard";
import useCategories from "../../utils/hooks/useCategories";
import useSearch from "../../utils/hooks/useSearch";
import { NotFound, SearchResults } from "./Search.styled";

export default function Search() {
  const { pathname, search, state } = useLocation();
  const searchParams = new URLSearchParams(search);
  const { page = 1 } = state || {};
  const categoriesData = useCategories();
  const productData = useSearch(page, searchParams.get("q") || "");

  let searchResults;
  if (!categoriesData.isLoading && !productData.isLoading) {
    let categoryNames = {};
    categoriesData.data.results.forEach(({ id, data: { name } }) => {
      categoryNames = { ...categoryNames, [id]: name };
    });

    const productsList = productData.data.results.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        category={categoryNames[product.data.category.id]}
        large
      />
    ));

    searchResults =
      productsList.length === 0 ? (
        <NotFound>Nothing was Found :(</NotFound>
      ) : (
        <SearchResults>
          <Grid>{productsList}</Grid>
          <Pagination
            navigation={`${pathname}${search}`}
            totalPages={productData.data.total_pages}
          />
        </SearchResults>
      );
  }

  return categoriesData.isLoading || productData.isLoading ? (
    <Loading />
  ) : (
    searchResults
  );
}
