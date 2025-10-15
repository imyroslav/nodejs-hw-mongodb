import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import { getEnvVar } from "./utils/getEnvVar.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { UPLOAD_DIR } from "./constants/index.js";

const PORT = Number(getEnvVar("PORT", "3000"));

export function setupServer() {
  
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

 
  app.use(cors());

  app.use(cookieParser());

  const logger = pino();
  app.use(pinoHttp({ logger }));

  app.use("/uploads", express.static(UPLOAD_DIR));

  // Root route
  app.get("/", (req, res) => {
    res.send('Сервер працює!');
  });

  app.use(router);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Started ${new Date().toLocaleString()}.`);
  });
  
  return app;
}
