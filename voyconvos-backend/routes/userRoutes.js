import { Router } from "express";
import { methods as userController } from "../controllers/userController.js";
import validateToken from "./validate-token.js";

const router = Router();

router.get("/", validateToken, userController.getUsers);
//router.get("/:ci", userController.getUserCI);
router.post("/", validateToken, userController.addUser);
router.post("/encriptado", userController.addUserEncrypt);
router.delete("/:ci",  userController.deleteUser);
//router.put("/:ci", userController.updateUser);

router.get("/:id", validateToken, userController.getUserID);
router.put("/:id", validateToken, userController.updateUserID);

//login
router.post('/login', userController.loginUser)
export default router;