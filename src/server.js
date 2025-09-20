import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";


export function setupServer() {
  
  const app = express();

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
    res.status(404).json({ error: 'Маршрут не знайдено' });
  });
  
  return app;
}

