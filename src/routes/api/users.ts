import { Router } from "express";
import { usersLogin, usersRegister } from "../../controllers/usersController";
import * as validator from "../../middleware/userValidator";

const router = Router();

router.post("/login", validator.userLoginValidator, usersLogin);

router.post("/", validator.userRegisterValidator, usersRegister);

export default router;
