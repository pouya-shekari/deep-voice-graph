import { render, waitFor } from "@utils/test-helper/test-utils";
import Actions from ".";

test("page has correct title", async () => {
  render(<Actions />);
  await waitFor(() => expect(document.title).toEqual("مدیریت اکشن‌ها"));
});
