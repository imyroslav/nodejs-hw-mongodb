import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', '3000'));


export default function setupServer() {
  
  const app = express();

  app.use(express.json());

// Налаштування CORS  
  app.use(cors());

// Налаштування логгера pino  
  const logger = pino();
  app.use(pinoHttp({ logger }));

  //global middleware
  app.use((req, res, next) => {
    console.log("Global Middleware");
    next();
  });

  // local middleware
  function middlewareLocal(req, res, next) {
    console.log("local middleware");
    next();
  }


// Ваші маршрути тут (приклад)  
  app.get('/', (req, res) => {
    res.send('Сервер працює!');
  });

  app.get('/books', middlewareLocal, (req, res) => {
    res.send('Books are here');
  });

// Обробка неіснуючих роутів 
  app.use((req, res) => {
    res.status(404).json({
  message: "Not found this route",
}
);
  });

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}. Started ${new Date().toLocaleString()}.`);
  });
  
  return app;
}
