import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import { getAllContacts, getContactById } from "./services/contacts.js";


const PORT = Number(getEnvVar("PORT", "3000"));


export function setupServer() {
  
  const app = express();

  app.use(express.json());

 
  app.use(cors());

  const logger = pino();
  app.use(pinoHttp({ logger }));

  // //global middleware
  // app.use((req, res, next) => {
  //   console.log("Global Middleware");
  //   next();
  // });

  // // local middleware
  // function middlewareLocal(req, res, next) {
  //   console.log("local middleware");
  //   next();
  // }


// Root route
  app.get('/', (req, res) => {
    res.send('Сервер працює!');
  });

  app.get('/books', (req, res) => {
    res.send('Books are here');
  });

  // All contacts route
  app.get("/contacts", async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  // Contact by id route
  app.get("/contacts/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);  

    if (!contact) {
	    res.status(404).json({
      message: "Contact not found"
	  });
	  return;
    }
    
    res.status(200).json({
	    message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
    next();
  });


  // Not existing route handler
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
