import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import serviceRoutes from "./routes/service";
import { config } from "./config";

const app = new Koa();
const PORT = config.port;
app.use(bodyParser());
app.use(
  cors(
   {
    origin: "*",
   } 
));

app.use(logger());

app.use(serviceRoutes.routes());

const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
}).on("error", err => {
  console.error(err);
});

export default server;
