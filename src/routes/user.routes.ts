import { Router } from "express";
import { 
  createUserController, 
  deleteUserController, 
  listUsersController, 
  updateUserController 
} from "../controller/user.controller";
import tokenValidationMiddleware from "../middleware/tokenValidation.middleware";

const userRouter = Router();

userRouter.post("/register",
  createUserController
),

userRouter.patch("/update/:id",
  tokenValidationMiddleware,
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
