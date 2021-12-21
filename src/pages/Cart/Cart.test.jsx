import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../../components/Navigation";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/test-utils";
import { NAVIGATION } from "../../utils/constants";
import Shop from "../Shop";
import Cart from "./Cart";

function renderCart() {
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );
}

async function renderShop() {
  render(
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Shop />} />
        <Route path={NAVIGATION.SHOP} element={<Shop />} />
        <Route path={NAVIGATION.CART} element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
  if (screen.queryAllByText(/loading/i).length > 0) {
    await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));
  }
}

test("Validate that an empty state is displayed when there are no items in the cart.", () => {
  renderCart();
  expect(screen.getByText(/the cart is empty/i)).toBeInTheDocument();
});

test("Validate that the list of products is shown when there are items in the cart.", async () => {
  await renderShop();
  const buttons = screen.getAllByRole("button", { name: /add to cart/i });
  buttons.forEach((button) => userEvent.click(button));
  userEvent.click(screen.getByRole("link", { name: /cart/i }));
  expect(screen.getByText(/image/i)).toBeInTheDocument();
  expect(screen.getByText(/name/i)).toBeInTheDocument();
  expect(screen.getByText(/price/i)).toBeInTheDocument();
  expect(screen.getByText(/quantity/i)).toBeInTheDocument();
  expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
  expect(screen.queryByText(/the cart is empty/i)).not.toBeInTheDocument();
  userEvent.click(screen.getByRole("link", { name: /logo/i }));
});

test("Validate that the cart total label displays the sum of the subtotals of all items in the cart.", async () => {
  await renderShop();
  const buttons = screen
    .getAllByRole("button", { name: /add to cart/i })
    .slice(0, 4);
  const prices = screen.getAllByText(/\$[\d|,]+\.\d*/).slice(0, 4);
  let total = 0;
  for (let index = 0; index < prices.length; index += 1) {
    total += parseFloat(prices[index].innerHTML.replaceAll(/[$,]+/g, ""));
  }
  buttons.forEach((button) => userEvent.click(button));
  userEvent.click(screen.getByRole("link", { name: /cart/i }));
  const pricesCheckout = screen.getAllByText(/\$[\d|,]+\.\d*/);
  expect(
    parseFloat(
      pricesCheckout[pricesCheckout.length - 1].innerHTML.replaceAll(
        /[$,]+/g,
        ""
      )
    )
  ).toBe(total);
});
