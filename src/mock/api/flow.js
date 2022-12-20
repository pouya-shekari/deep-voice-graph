import { rest } from "msw";
import BASEURL from "@constants/BASEURL";
export const flow = [
    rest.get(`${BASEURL}/flow/list?applicationId=5`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    flowId: 131,
                    nameEN: "Slow",
                    nameFA: "کندی",
                    description: "این فلوچارت توسط تیم فرانت پیاده سازی شده است.",
                    enable: true
                },
                {
                    flowId: 132,
                    nameEN: "Fast",
                    nameFA: "تندی",
                    description: "این فلوچارت توسط تیم فرانت پیاده سازی شده است.",
                    enable: true
                },
            ])
        );
    }),

    rest.post(`${BASEURL}/flow/create`, async (req, res, ctx) => {
        const flows = [
            { applicationId: 5, nameEN: "Slow", nameFA: "کندی" , description: "این فلوچارت توسط تیم فرانت پیاده سازی شده است."},
            { applicationId: 5, nameEN: "Fast", nameFA: "تندی" , description: "این فلوچارت توسط تیم فرانت پیاده سازی شده است."},
        ];
        const { nameEN , nameFA , description } = await req.json();
        const isDuplicate =
            flows.findIndex((flow) => flow.nameEN === text) > -1 ? true : flows.findIndex((flow) => flow.nameFA === text) > -1 ? true : false;
        if (isDuplicate) {
            return res(ctx.status(409));
        }
        return res(
            ctx.status(200),
            ctx.json({
                flowId: 133,
                nameEN: nameEN,
                nameFA: nameFA,
                description: description,
                enable: true
            })
        );
    }),
];
