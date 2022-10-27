import express, { json } from "express";
require("dotenv").config();
import "./config";
import cors from "cors";
import userRouter from "./routes/userRouter";
import { errorHandler } from "./utils/errorHandler";
import projectsRouter from "./routes/projectsRouter";

const app = express();
app.use(json());
app.use(cors());

app.use("/user", userRouter)
app.use("/projects", projectsRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Timed-unlock backend server listening on port ${PORT}`);
})