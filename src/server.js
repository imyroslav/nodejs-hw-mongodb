import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

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

  const logger = pino();
  app.use(pinoHttp({ logger }));

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
