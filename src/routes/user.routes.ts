import { Router } from "express";
import { 
  createUserController, 
  deleteUserController, 
  listUsersController, 
  updateUserController 
} from "../controller/user.controller";
import tokenValidationMiddleware from "../middleware/tokenValidation.middleware";
import validatedBody from "../schema/bodyValidation.schema";
import { userValidationCreate, userValidationUpdate } from "../schema/userValidation.schema";

const userRouter = Router();

userRouter.post("/register",
  validatedBody(userValidationCreate),
  createUserController
),

userRouter.patch("/update/:id",
  tokenValidationMiddleware,
  validatedBody(userValidationUpdate),
  updateUserController
);

userRouter.get("/list",
  tokenValidationMiddleware,
  listUsersController
);

userRouter.delete("/delete/:id",
  tokenValidationMiddleware,
  deleteUserController
);

export default userRouter;
