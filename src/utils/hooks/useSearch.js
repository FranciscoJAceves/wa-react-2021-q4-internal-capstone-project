import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import useLatestAPI from "./useLatestAPI";

export default function useSearch(page, searchTerm) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [search, setSearch] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getSearch() {
      try {
        setSearch({ data: {}, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&q=${encodeURIComponent(
            `[[fulltext(document, "${searchTerm}")]]`
          )}&lang=en-us&pageSize=20&page=${page}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setSearch({ data, isLoading: false });
      } catch (err) {
        setSearch({ data: {}, isLoading: false });
      }
    }

    getSearch();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, searchTerm, page]);

  return search;
}
