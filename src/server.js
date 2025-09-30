import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contacts.js";



const PORT = Number(getEnvVar("PORT", "3000"));


export function setupServer() {
  
  const app = express();

  app.use(express.json());

 
  app.use(cors());

  const logger = pino();
  app.use(pinoHttp({ logger }));

  // Root route
  app.get('/', (req, res) => {
    res.send('Сервер працює!');
  });

  app.use(contactsRouter);

  // Not existing route handler
  app.use((req, res) => {
    res.status(404).json({
    message: "Not found this route",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });



  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}. Started ${new Date().toLocaleString()}.`);
  });
  
  return app;
}
