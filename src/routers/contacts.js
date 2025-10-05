import { Router } from "express";
import {
    postContactSchema,
    patchContactSchema
 } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js"
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getContactsController));
router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));

router.post("/contacts", validateBody(postContactSchema), ctrlWrapper(createContactController));

router.patch("/contacts/:contactId", validateBody(patchContactSchema), ctrlWrapper(patchContactController))

router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

export default router;
