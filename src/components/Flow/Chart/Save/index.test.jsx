import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Save from ".";

test("save flow modal is shown when save flow button clicked", async () => {
    const user = userEvent.setup();

    render(<Save nodes={[]} edges={[]} flowId={43} />, {
        wrapperProps: {
            modalOptions: { isSaveFlowModalOpen: false },
        },
    });
    const saveBtn = screen.getByRole("button", { name: "ذخیره‌ فلوچارت" });
    await user.click(saveBtn);
    expect(
        screen.getByRole("presentation", { name: /save-flow-modal/i })
    ).toBeInTheDocument();
});

test("save flow modal must close when user click on cancel button", async () => {
    const user = userEvent.setup();

    render(<Save nodes={[]} edges={[]} flowId={43} />, {
        wrapperProps: {
            modalOptions: { isSaveFlowModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "save-flow-modal" })
    );
});

test("save flow modal must close and then call updateFlowHandler event when user click on confirm button", async () => {
    const user = userEvent.setup();

    render(<Save nodes={[
        {
            "id": "659ab71a-2bb2-446b-8d73-ac31f3b3dc85",
            "type": "Announcement",
            "position": {
                "x": 833.7442851844811,
                "y": -12.990541296956565
            },
            "data": {
                "label": "تست اعلان ۲",
                "waitTime": 54,
                "responses": [
                    ""
                ],
                "resourceId": 36,
                "errors": []
            },
            "width": 160,
            "height": 70
        },
        {
            "id": "a1abf3ee-21e2-4f0d-bceb-71a38e5495cd",
            "type": "End",
            "position": {
                "x": 952.514294769187,
                "y": 189.84245512949576
            },
            "data": {
                "label": "پایان",
                "waitTime": 0,
                "responses": [],
                "resourceId": 1,
                "errors": []
            },
            "width": 150,
            "height": 46
        },
        {
            "id": "b115bb3e-a3c8-4315-a4b1-877e42e6a968",
            "type": "Start",
            "position": {
                "x": 920.0513193100844,
                "y": -164.91790568157015
            },
            "data": {
                "label": "شروع",
                "waitTime": 0,
                "responses": [],
                "resourceId": 1,
                "errors": []
            },
            "width": 150,
            "height": 46
        }
    ]} edges={[
        {
            "id": "57",
            "type": "smoothstep",
            "source": "659ab71a-2bb2-446b-8d73-ac31f3b3dc85",
            "target": "a1abf3ee-21e2-4f0d-bceb-71a38e5495cd",
            "label": "",
            "sourceHandle": ""
        },
        {
            "id": "13",
            "type": "smoothstep",
            "source": "b115bb3e-a3c8-4315-a4b1-877e42e6a968",
            "target": "659ab71a-2bb2-446b-8d73-ac31f3b3dc85",
            "label": "",
            "sourceHandle": ""
        }
    ]} flowId={43} />, {
        wrapperProps: {
            modalOptions: { isSaveFlowModalOpen: true },
        },
    });
    const confirmBtn = screen.getByRole("button", { name: "ذخیره" });
    await user.click(confirmBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "save-flow-modal" })
    );
});
