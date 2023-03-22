import { Router } from "express";
import { 
  createContactController, 
  deleteContactController, 
  listContactsController, 
  updateContactController 
} from "../controller/contact.controller";
import tokenValidationMiddleware from "../middleware/tokenValidation.middleware";

const contactsRoutes = Router();

contactsRoutes.post("/register",
  tokenValidationMiddleware,
  createContactController
);

contactsRoutes.get("/list",
  tokenValidationMiddleware,
  listContactsController
);

contactsRoutes.patch("/update/:id",
  tokenValidationMiddleware,
  updateContactController
);

contactsRoutes.delete("/delete/:id",
  tokenValidationMiddleware,
  deleteContactController
);

export default contactsRoutes;
