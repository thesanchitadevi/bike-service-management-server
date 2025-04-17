import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { HttpStatus } from "http-status-ts";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Bike Service Management Server Running..",
  });
});

// application routes
app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use(notFound);

export default app;
