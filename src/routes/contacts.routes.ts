import { Router } from "express";
import { 
  createContactController, 
  deleteContactController, 
  listContactsController, 
  updateContactController 
} from "../controller/contact.controller";
import tokenValidationMiddleware from "../middleware/tokenValidation.middleware";
import validatedBody from "../schema/bodyValidation.schema";
import { contactValidationCreate, contactValidationUpdate } from "../schema/contactValidation.schema";


const contactsRoutes = Router();

contactsRoutes.post("/register",
  tokenValidationMiddleware,
  validatedBody(contactValidationCreate),
  createContactController
);

contactsRoutes.get("/list",
  tokenValidationMiddleware,
  listContactsController
);

contactsRoutes.patch("/update/:id",
  tokenValidationMiddleware,
  validatedBody(contactValidationUpdate),
  updateContactController
);

contactsRoutes.delete("/delete/:id",
  tokenValidationMiddleware,
  deleteContactController
);

export default contactsRoutes;
