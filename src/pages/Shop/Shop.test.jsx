import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/test-utils";
import Shop from "./Shop";

async function renderShop() {
  render(
    <MemoryRouter>
      <Shop />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));
}

const categories = require("../../mocks/en-us/product-categories.json");
const products = require("../../mocks/en-us/products.json");

test("Product Category Sidebar is fetching and rendering data from the API", async () => {
  await renderShop();
  expect(
    screen.getByRole("link", { name: categories.results[0].data.name })
  ).toBeInTheDocument();
});

test("Category links on Product Category Sidebar are filtering Products Grid correctly interacting with the API", async () => {
  await renderShop();
  const categoryName1 = categories.results[0].data.name;
  const categoryName2 = categories.results[1].data.name;
  expect(screen.getAllByText(categoryName1).length).toBeGreaterThan(1);
  expect(screen.getAllByText(categoryName2).length).toBeGreaterThan(1);
  userEvent.click(screen.getByRole("link", { name: categoryName1 }));
  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));
  expect(screen.getAllByText(categoryName1).length).toBeGreaterThan(1);
  expect(screen.getAllByText(categoryName2)).toHaveLength(1);
});

test("Pagination Controls are generated correctly based on the number of results fetched from the API and the maximum number of products per page", async () => {
  await renderShop();
  for (let page = 1; page <= products.total_pages; page += 1) {
    expect(screen.getByRole("link", { name: page })).toBeInTheDocument();
  }
  expect(
    screen.queryByRole("link", { name: products.total_pages + 1 })
  ).not.toBeInTheDocument();
});
