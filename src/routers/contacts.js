import { Router } from "express";
import {
    postContactSchema,
    patchContactSchema
} from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js"
import { validateBody } from "../middlewares/validateBody.js"
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));
router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/", validateBody(postContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", isValidId, validateBody(patchContactSchema), ctrlWrapper(patchContactController))

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;
