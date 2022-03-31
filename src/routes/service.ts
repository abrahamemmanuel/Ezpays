import Router from "koa-router";
//import service controller
import ServiceController  from "../controllers/ServiceController";

const router = new Router();

const serviceController = new ServiceController();

router.post("/service", serviceController.service);

export default router;