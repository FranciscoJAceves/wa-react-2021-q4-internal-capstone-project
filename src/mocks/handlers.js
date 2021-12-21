import { rest } from "msw";
import { API_BASE_URL } from "../utils/constants";

const featuredBanners = require("./en-us/featured-banners.json");
const productCategories = require("./en-us/product-categories.json");
const products = require("./en-us/products.json");
const featuredProducts = require("./en-us/featured-products.json");

const mockApiRef = "mockRef";

const handlers = [
  rest.get(API_BASE_URL, (_, res, ctx) =>
    res(ctx.json({ refs: [{ ref: mockApiRef }] }))
  ),

  rest.get(`${API_BASE_URL}/documents/search`, (req, res, ctx) => {
    const [query, options] = req.url.searchParams.getAll("q");
    if (query === '[[at(document.type, "banner")]]') {
      return res(ctx.json(featuredBanners));
    }

    if (query === '[[at(document.type, "category")]]') {
      return res(ctx.json(productCategories));
    }

    if (query === '[[at(document.type, "product")]]') {
      if (options === '[[at(document.tags, ["Featured"])]]') {
        return res(ctx.json(featuredProducts));
      }

      if (/\[\[fulltext\(document, ".*"\)\]\]/.test(options)) {
        const searchString = options.substring(
          options.indexOf('"') + 1,
          options.lastIndexOf('"')
        );
        const filteredProducts = JSON.parse(JSON.stringify(products));
        filteredProducts.results = products.results.filter((product) =>
          new RegExp(searchString, "i").test(JSON.stringify(product.data))
        );
        return res(ctx.json(filteredProducts));
      }

      return res(ctx.json(products));
    }

    if (/\[\[any\(my\.product\.category, \[.*\]\)\]\]/.test(query)) {
      const filterArray = query
        .substring(query.indexOf('"'), query.lastIndexOf('"'))
        .replaceAll('"', "")
        .split(",");
      const filteredProducts = JSON.parse(JSON.stringify(products));
      filteredProducts.results = products.results.filter((product) =>
        filterArray.includes(product.data.category.id)
      );
      return res(ctx.json(filteredProducts));
    }

    if (/\[\[at\(document\.id, ".*"\)\]\]/.test(query)) {
      const productID = query.substring(
        query.indexOf('"') + 1,
        query.lastIndexOf('"')
      );
      const foundProduct = JSON.parse(JSON.stringify(products));
      foundProduct.results = products.results.filter(
        (product) => product.id === productID
      );
      return res(ctx.json(foundProduct));
    }

    return res(ctx.status(404));
  }),
];

export default handlers;
