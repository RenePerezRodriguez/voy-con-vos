import { Router } from "express";
import { methods as userController } from "../controllers/user-controller.js";
import validateToken from "./validate-token.js";

const router = Router();

router.get("/", validateToken, userController.getUsers);
router.post("/", validateToken, userController.addUser);
router.delete("/:ci", validateToken, userController.deleteUser);
//router.put("/:ci", userController.updateUser);
//router.get("/:ci", userController.getUserCI);
router.get("/:id", validateToken, userController.getUserByID);
router.put("/:id", validateToken, userController.updateUserID);
export default router;