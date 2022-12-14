import { rest } from "msw";
import BASEURL from "@constants/BASEURL";
export const login = [
  rest.post(`${BASEURL}/user/login`, async (req, res, ctx) => {
    const { username } = await req.json();
    if (username === "Mohamad") return res(ctx.json({}));
    return res(ctx.status(401));
  }),
];
