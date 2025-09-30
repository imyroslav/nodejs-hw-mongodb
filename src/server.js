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


// Root route
  app.get('/', (req, res) => {
    res.send('Сервер працює!');
  });

  // All contacts route
  app.get("/contacts", async (req, res) => {
    
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    }, null, 2);
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
      status: 200,
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
