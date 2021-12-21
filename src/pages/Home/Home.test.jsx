import { MemoryRouter } from "react-router";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/test-utils";
import Home from "./Home";

async function renderHome() {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));
}

const featuredBanners = require("../../mocks/en-us/featured-banners.json");

test("Featured Banners Slider is fetching and rendering data from the API", async () => {
  await renderHome();
  expect(
    screen.getByText(featuredBanners.results[0].data.title)
  ).toBeInTheDocument();
});

const categories = require("../../mocks/en-us/product-categories.json");

test("Categories Carousel/Grid is fetching and rendering data from the API", async () => {
  await renderHome();
  expect(
    screen.getAllByText(categories.results[0].data.name)[0]
  ).toBeInTheDocument();
});

const featuredProducts = require("../../mocks/en-us/featured-products.json");

test("Featured Products Grid is fetching and rendering data from the API", async () => {
  await renderHome();
  expect(
    screen.getByText(featuredProducts.results[0].data.name)
  ).toBeInTheDocument();
});
