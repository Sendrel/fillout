import express, { Express, Request, Response } from "express";
import { formRouter } from "./routes/forms/formRouter";
import errorHandler from "./utils/errorHandler";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
app.use("/v1/api/forms", formRouter);
app.use(errorHandler());
export { app };
