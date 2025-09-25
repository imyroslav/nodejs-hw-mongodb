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


// Ваші маршрути тут (приклад)  
  app.get('/', (req, res) => {
    res.send('Сервер працює!');
  });

// Обробка неіснуючих роутів 
  app.use((req, res) => {
    res.status(404).json({
  message: "Not found",
}
);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  return app;
}
