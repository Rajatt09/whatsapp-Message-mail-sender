import { Router } from "express";
import InitializeWhatsappClient from "../controllers/whatsapp_controllers.js";
import sendMail from "../controllers/email_controllers.js";
// const users = require("../utils/users.js");

const router = Router();

router.route("/sendMessage/via-whatsapp").post(InitializeWhatsappClient);
// router.route("/sendMessage/via-gmail").post(sendMail);


router.get('/sendMessage/via-gmail', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Ensure headers are sent immediately

    // Call the function to handle sending emails and push updates
    sendMail(res);
});



export default router;
