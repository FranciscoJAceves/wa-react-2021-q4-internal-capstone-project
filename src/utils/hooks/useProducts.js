import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import useLatestAPI from "./useLatestAPI";

export default function useProducts(page, filter) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [products, setProducts] = useState(() => ({
    data: {},
    isLoading: true,
  }));
  const filterString = filter.length === 0 ? "" : `"${filter.join('","')}"`;

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getProducts() {
      try {
        setProducts({ data: {}, isLoading: true });

        const encodedFilter =
          filterString === ""
            ? encodeURIComponent('[[at(document.type, "product")]]')
            : encodeURIComponent(
                `[[any(my.product.category, [${filterString}])]]`
              );

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodedFilter}&lang=en-us&pageSize=12&page=${page}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setProducts({ data, isLoading: false });
      } catch (err) {
        setProducts({ data: {}, isLoading: false });
      }
    }

    getProducts();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, page, filterString]);

  return products;
}
