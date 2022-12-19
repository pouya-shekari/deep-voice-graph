import { rest } from "msw";
import BASEURL from "@constants/BASEURL";
export const announcement = [
    rest.get(`${BASEURL}/announcement/list`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    announcementId: 153,
                    text: "لطفا چند لحظه منتظر بمانید.",
                    isQuestion: false,
                    responses: [],
                    isEnable: true,
                    flowNames: ["Slow", "slow(copy)", "slow - copy 2"],
                },
                {
                    announcementId: 152,
                    text: "فعلا خدانگهدار.",
                    isQuestion: false,
                    responses: [],
                    isEnable: true,
                    flowNames: ["Slow", "asdsad", "slow(copy)", "slow - copy 2"],
                },
            ])
        );
    }),
    rest.post(`${BASEURL}/announcement/create`, async (req, res, ctx) => {
        const announcements = [
            { applicationId: 5, text: "Announcement 1"},
            { applicationId: 5, text: "Announcement 2"},
        ];
        const { text, url } = await req.json();
        const isDuplicate =
            announcements.findIndex((action) => action.text === text) > -1 ? true : false;
        if (isDuplicate) {
            return res(ctx.status(409));
        }
        return res(
            ctx.status(200),
            ctx.json({
                announcementId: "test1",
                text: text,
                isQuestion: false,
                responses: [],
                isEnable: true,
                flowNames: null,
            })
        );
    }),
];
