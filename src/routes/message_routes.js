import { Router } from "express";
import InitializeWhatsappClient from "../controllers/whatsapp_controllers.js";
import sendMail from "../controllers/email_controllers.js";
import { getMailsMessagesHistory } from "../controllers/data_controllers.js";
import { setWhatsappMessage } from "../controllers/whatsapp_controllers.js";

const router = Router();

router.get("/sendMessage/via-whatsapp", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // Ensure headers are sent immediately

  // Handle sending WhatsApp messages and push updates
  InitializeWhatsappClient(res).catch((error) => {
    console.error("Error during WhatsApp message initialization:", error);
    res.write(
      `data: ${JSON.stringify({
        message: "Error in sending WhatsApp messages",
        error: error.message,
      })}\n\n`
    );
    res.end();
  });
});

router.get("/sendMessage/via-gmail", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // Ensure headers are sent immediately

  // Handle sending emails and push updates
  sendMail(res).catch((error) => {
    console.error("Error during email sending:", error);
    res.write(
      `data: ${JSON.stringify({
        message: "Error in sending emails",
        error: error.message,
      })}\n\n`
    );
    res.end();
  });
});

router.get("/sendMesage/via-both", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // sending both email and whatsapp messages simultaneously

  try {
    // // Send both WhatsApp messages and emails concurrently
    // await Promise.all([
    //     InitializeWhatsappClient(res),
    //     sendMail(res)
    // ]);

    // Initialize WhatsApp client
    await InitializeWhatsappClient(res);
    // Send emails
    // await sendMail(res);

    // Send success message after both tasks complete
    res.write(
      `data: ${JSON.stringify({
        message: "Both WhatsApp messages and emails sent successfully.",
      })}\n\n`
    );
  } catch (error) {
    console.error("Error during simultaneous sending:", error);
    res.write(
      `data: ${JSON.stringify({
        message: "Error in sending messages",
        error: error.message,
      })}\n\n`
    );
  } finally {
    res.end(); // End the SSE stream
  }
});

router.post("/sendMessage/whatsappData", setWhatsappMessage);

router.get("/get-mails-messages/history", (req, res) => {
  getMailsMessagesHistory(req, res);
});

export default router;
