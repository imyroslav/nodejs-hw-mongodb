import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

const PORT = Number(getEnvVar("PORT", "3000"));

export function setupServer() {
  
  const app = express();

  app.use(express.json());

 
  app.use(cors());

  const logger = pino();
  app.use(pinoHttp({ logger }));

  // Root route
  app.get("/", (req, res) => {
    res.send('Сервер працює!');
  });

  app.use(contactsRouter);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Started ${new Date().toLocaleString()}.`);
  });
  
  return app;
}
