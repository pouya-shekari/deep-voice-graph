import { render, screen } from "@utils/test-helper/test-utils";
import Questions from ".";

test("page has correct title", async () => {
  render(<Questions />);
  expect(screen.getByText("هوش افزار راهبر آریامن")).toBeInTheDocument();
});
