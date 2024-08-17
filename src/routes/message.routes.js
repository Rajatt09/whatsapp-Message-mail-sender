import { Router } from "express";
import InitializeWhatsappClient from "./../controllers/whatsapp.controllers.js";
import sendMail from "../controllers/email.controllers.js";

const router = Router();

router.route("/sendMessage/via-whatsapp").post(InitializeWhatsappClient);
router.route("/sendMessage/via-gmail").post(sendMail);

export default router;
