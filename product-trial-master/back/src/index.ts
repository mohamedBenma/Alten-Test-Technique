import express from "express";
import productRouter from "./routes/product.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./docs/swagger.json";
import userRouter from "./routes/user.routes";
import logger from "./utils/logger";
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use("/products", productRouter);
app.use("/", authRouter);
app.use("/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  logger.info(`✅ API listening on http://localhost:${port}`);
  logger.info(`📘 Swagger available at http://localhost:${port}/docs`);
});
