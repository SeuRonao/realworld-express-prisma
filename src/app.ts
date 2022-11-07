import express from "express";
import usersRouter from "./routes/api/users";
import userRouter from "./routes/api/user";
import profilesRouter from "./routes/api/profiles";
import articlesRouter from "./routes/api/articles";
import tagsRouter from "./routes/api/tags";
import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import {
  authErrorHandler,
  prismaErrorHandler,
} from "./middleware/errorHandling";

const app = express();

// Allows parsing of json in the body of the request.
app.use(express.json());

app.use("/api/users", usersRouter);

app.use("/api/user", userRouter);

app.use("/api/profiles", profilesRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/tags", tagsRouter);

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;
