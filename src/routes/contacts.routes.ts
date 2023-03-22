import { Router } from "express";
import { 
  createContactController, 
  deleteContactController, 
  listContactsController, 
  updateContactController 
} from "../controller/contact.controller";

const contactsRoutes = Router();

contactsRoutes.post("/register",
  createContactController
);

contactsRoutes.get("/list", 
  listContactsController
);

contactsRoutes.patch("/update/:id",
  updateContactController
);

contactsRoutes.delete("/delete/:id",
  deleteContactController
);

export default contactsRoutes;
