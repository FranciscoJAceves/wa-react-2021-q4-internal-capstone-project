import { useLocation } from "react-router";
import ProductFilter from "../../components/ProductFilter";
import useCategories from "../../utils/hooks/useCategories";
import useProducts from "../../utils/hooks/useProducts";

export default function Shop() {
  const { page = 1, filter = [] } = useLocation().state || {};
  const categoriesData = useCategories();
  const productsData = useProducts(page, filter);

  return <ProductFilter categories={categoriesData} products={productsData} />;
}
