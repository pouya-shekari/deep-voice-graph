import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Reset from ".";

test("reset flow modal is shown when reset flow button clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Reset onClick={onClick} />, {
        wrapperProps: {
            modalOptions: { isResetFlowModalOpen: false },
        },
    });
    const resetBtn = screen.getByRole("button", { name: "بازنشانی فلوچارت" });
    await user.click(resetBtn);
    expect(
        screen.getByRole("presentation", { name: /reset-flow-modal/i })
    ).toBeInTheDocument();
});

test("reset flow modal must close when user click on cancel button", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Reset onClick={onClick} />, {
        wrapperProps: {
            modalOptions: { isResetFlowModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "reset-flow-modal" })
    );
    expect(onClick).toBeCalledTimes(0);
});

test("reset flow modal must close and then call onClick event when user click on confirm button", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Reset onClick={onClick} />, {
        wrapperProps: {
            modalOptions: { isResetFlowModalOpen: true },
        },
    });
    const confirmBtn = screen.getByRole("button", { name: "بازنشانی" });
    await user.click(confirmBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "reset-flow-modal" })
    );
    expect(onClick).toBeCalledTimes(1);
});
