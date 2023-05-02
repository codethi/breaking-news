import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import { loadEnv } from "@/config/envs";
import ConnectToMongoDb from "@/config/database";
import router from "@/routes";
import { handleApplicationErrors } from "@/middlewares/ErrorsMiddlewares";

loadEnv();
ConnectToMongoDb.execute();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleApplicationErrors);

export default app;
