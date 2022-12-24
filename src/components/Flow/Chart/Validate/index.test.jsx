import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Validate from ".";

test("validate flow is call when validate flow button clicked", async () => {
    const user = userEvent.setup();
    const onValidateEnd = jest.fn();

    render(<Validate nodes={[]} edges={[]} onValidateEnd={onValidateEnd} />);
    const validateBtn = screen.getByRole("button", { name: "اعتبارسنجی فلوچارت" });
    await user.click(validateBtn);
    expect(onValidateEnd).toBeCalledTimes(1);
});