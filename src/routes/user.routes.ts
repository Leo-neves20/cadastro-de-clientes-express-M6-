import { Router } from "express";
import { 
  createUserController, 
  deleteUserController, 
  listUsersController, 
  updateUserController 
} from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/register",
  createUserController
),

userRouter.patch("/update/:id",
  updateUserController
);

userRouter.get("/list", 
  listUsersController
);

userRouter.delete("/delete/:id",
  deleteUserController
);

export default userRouter;
