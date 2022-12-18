import { rest } from "msw";
import BASEURL from "@constants/BASEURL";
export const action = [
  rest.get(`${BASEURL}/action/list`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          actionId: 149,
          text: "مقدار Profile برابر با Radius تنظیم شود.",
          url: "29dae4a6-d2ff-ea11-9c19-00505681c83b",
          isEnable: true,
          flowNames: ["Slow", "asdsad"],
        },
        {
          actionId: 150,
          text: "مقدار پیش فرض در پروفایل ذخیره شود.",
          url: "29dae4a6-d2ff-ea11-9c19-00505681c83bs",
          isEnable: true,
          flowNames: ["Slow"],
        },
      ])
    );
  }),

  rest.post(`${BASEURL}/action/create`, async (req, res, ctx) => {
    const actions = [
      { applicationId: 5, text: "Action 1", url: "URL 1" },
      { applicationId: 5, text: "Action 2", url: "URL 2" },
    ];
    const { text, url } = await req.json();
    const isDuplicate =
      actions.findIndex((action) => action.text === text) > -1 ? true : false;
    if (isDuplicate) {
      return res(ctx.status(409));
    }
    return res(
      ctx.status(200),
      ctx.json({
        actionId: "test1",
        text: text,
        url: url,
        isEnable: true,
        flowNames: null,
      })
    );
  }),
];
