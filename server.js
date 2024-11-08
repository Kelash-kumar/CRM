import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from './app/routes/App.route.js';
import sequelize from "./app/configs/init.js";
import errorHandler from "./app/middlewares/errorHandler.js";
import environment from "./app/utils/environment.js";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(cors());

if (environment.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/goHighLevelWebhooks", routes);

app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database connected");
});

const PORT = environment.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
