import { rest } from "msw";
import BASEURL from "@constants/BASEURL";
export const question = [
  rest.get(`${BASEURL}/announcement/list`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          announcementId: 153,
          text: "آیا امکان خاموش روشن کردن مودم را دارید؟",
          isQuestion: true,
          responses: ["بله", "خیر"],
          isEnable: true,
          flowNames: ["Slow", "slow(copy)", "slow - copy 2"],
        },
        {
          announcementId: 152,
          text: "آیا مشکل کندی حل شد؟",
          isQuestion: true,
          responses: ["بله", "خیر"],
          isEnable: true,
          flowNames: ["Slow", "asdsad", "slow(copy)", "slow - copy 2"],
        },
      ])
    );
  }),
];
