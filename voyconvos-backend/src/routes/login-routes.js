import { Router } from "express";
import { methods as loginController } from "../controllers/login-controller.js";

const router = Router();

router.post("/", loginController.addUserEncrypt);
//login
router.post('/auth', loginController.loginUser)
export default router;