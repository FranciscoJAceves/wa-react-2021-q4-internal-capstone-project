import { MemoryRouter } from "react-router";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test/test-utils";
import Search from "./Search";

async function renderSearch(searchTerm) {
  render(
    <MemoryRouter initialEntries={[`/search?q=${searchTerm}`]}>
      <Search />
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));
}

test("Validate that the list of results is rendering data according to the “searchTerm” provided.", async () => {
  const searchTerm = "sofa";
  await renderSearch(searchTerm);
  expect(
    screen.queryAllByText(new RegExp(searchTerm, "i")).length
  ).toBeGreaterThan(0);
});

test("Validate that an empty state is displayed when there are no results for the “searchTerm” provided.", async () => {
  const searchTerm = "This search shouldn't find anything";
  await renderSearch(searchTerm);
  expect(screen.queryAllByText(new RegExp(searchTerm, "i"))).toHaveLength(0);
  expect(screen.getByText(/nothing was found/i)).toBeInTheDocument();
});
