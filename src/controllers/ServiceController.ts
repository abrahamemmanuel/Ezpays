import Router from "koa-router";

export default class ServiceController {
  public service = async (ctx: Router.IRouterContext) => {
    try {
      const { jsonFile } = ctx.request.body;
      const data = JSON.parse(jsonFile);
      if (!Array.isArray(data) || data.some( (item) =>
            typeof item !== "object" ||
            Object.keys(item).length !== 2 ||
            typeof item.user !== "string" ||
            typeof item.amount !== "number"
        )
      ) {
        ctx.status = 400;
        ctx.body = {
          status: "failed",
          message: "Invalid JSON file",
          data: data,
        };
        return;
      }
      ctx.status = 200;
      ctx.body = {
        status: "success",
        message: "Successfully processed",
        data: data,
      };
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        status: "error",
        message: e,
      };
    }
  };
}