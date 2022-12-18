import { rest } from "msw";
import BASEURL from "@constants/BASEURL";
export const checker = [
    rest.get(`${BASEURL}/checker/list`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    checkerId: 149,
                    text: "آیا ترافیک مشترک به اتمام رسیده است؟",
                    url: "29dae4a6-d2ff-ea11-9c19-00505681c83b",
                    isEnable: true,
                    flowNames: ["Slow", "asdsad"],
                },
                {
                    checkerId: 150,
                    text: "آیا مرکز مخابراتی اختلال شدید دارد؟",
                    url: "29dae4a6-d2ff-ea11-9c19-00505681c83bs",
                    isEnable: true,
                    flowNames: ["Slow"],
                },
            ])
        );
    }),

    rest.post(`${BASEURL}/checker/create`, async (req, res, ctx) => {
        const checkers = [
            { applicationId: 5, text: "Checker 1", url: "URL 1" },
            { applicationId: 5, text: "Checker 2", url: "URL 2" },
        ];
        const { text, url } = await req.json();
        const isDuplicate =
            checkers.findIndex((action) => action.text === text) > -1 ? true : false;
        if (isDuplicate) {
            return res(ctx.status(409));
        }
        return res(
            ctx.status(200),
            ctx.json({
                checkerId: "test1",
                text: text,
                url: url,
                isEnable: true,
                flowNames: null,
            })
        );
    }),
];
