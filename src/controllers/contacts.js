import createHttpError from "http-errors";
import {
    getAllContacts,
    getContactById,
    createContact,
    patchContact,
    deleteContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

// Get all contacts controller
export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

// Get contact by id controller
export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);  

    if (contact === null) {
        throw new createHttpError.NotFound("Contact not found :( ");
    }
    
    res.status(200).json({
        status: 200,
	    message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

// Post new contact controller
export const createContactController = async (req, res) => {
    
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

// Patch contact by id
export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await patchContact(contactId, req.body);

    if (result === null) {
    throw new createHttpError.NotFound("Contact not found :( ");
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.contact,
  });
};


// Delete contact by id
export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (contact === null) {
        throw new createHttpError.NotFound("Contact not found :( ");
    }

    res.status(204).send();
};