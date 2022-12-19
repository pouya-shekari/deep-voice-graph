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
  rest.post(`${BASEURL}/announcement/create`, async (req, res, ctx) => {
    const questions = [
      {
        applicationId: 5,
        text: "Question 1",
        isQuestion: true,
        responses: ["yes", "no"],
      },
      {
        applicationId: 5,
        text: "Question 2",
        isQuestion: true,
        responses: ["yes", "no"],
      },
    ];
    const { text, responses } = await req.json();
    const isDuplicate =
      questions.findIndex((question) => question.text === text) > -1
        ? true
        : false;
    console.log(isDuplicate);
    if (isDuplicate) {
      return res(ctx.status("409"));
    }
    return res(
      ctx.status(200),
      ctx.json({
        announcementId: "test id",
        text: text,
        isQuestion: true,
        responses: responses,
        isEnable: true,
        flowNames: null,
      })
    );
  }),
];
