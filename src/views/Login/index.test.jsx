import { screen, render } from "@utils/test-helper/test-utils";
import LoginPage from ".";

test("login page render correctly", () => {
  render(<LoginPage />);
  expect(
    screen.getByRole("heading", { name: /هوش افزار راهبر آریامن/ })
  ).toBeInTheDocument();
});
