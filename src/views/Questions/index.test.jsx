import { render, waitFor } from "@utils/test-helper/test-utils";
import Questions from ".";

test("page has correct title", async () => {
  render(<Questions />);
  await waitFor(() => expect(document.title).toEqual("مدیریت سوال‌ها"));
});
