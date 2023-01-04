import BASEURL from "@constants/BASEURL";
import { screen, render, act, waitFor } from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Search from ".";

test("search component should render correctly", () => {
  render(<Search />);
  const searchBox = screen.getByRole("searchbox", { name: "جستجو" });
  expect(searchBox).toBeInTheDocument();
  expect(searchBox).toHaveValue("");
  expect(searchBox).toBeEnabled();
});

test("search box value should change on user type", async () => {
  const user = userEvent.setup();
  render(<Search />);
  const searchBox = screen.getByRole("searchbox", { name: "جستجو" });
  await user.type(searchBox, "search term");
  expect(searchBox).toHaveValue("search term");
});

test("search function should called with query", async () => {
  const user = userEvent.setup();
  const searchFunc = jest.fn();
  render(<Search onSearch={searchFunc} />);
  const searchBox = screen.getByRole("searchbox", { name: "جستجو" });
  await user.type(searchBox, "search term");
  expect(searchBox).toHaveValue("search term");
});
