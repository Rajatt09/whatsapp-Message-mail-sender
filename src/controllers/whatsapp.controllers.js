import users from "../utils/users.js";
import { sleep } from "../utils/sleep.js";
import WhatsappWeb from "whatsapp-web.js";

const sendMessage = async (client) => {
  console.log("Sending messages, opening WhatsApp...");
  try {
    for (const user of users) {
      if (!user || !user.phoneNo || !user.name) continue;
      const phone = parseInt("91" + user.phoneNo);
      const name = user.name.toUpperCase().trim();

      const message =
        "Hello *" +
        name +
        "*,\n\n" +
        "This is a test message.\n\n- This is a bullet point\n\n_This is italics_\n\n*This is bold*";

      console.log("Sending message to :: ", phone);
      try {
        await client.sendMessage(`${phone}@c.us`, message);
        console.log(`Message sent to ${phone}`);
      } catch (error) {
        console.log(
          `ERR [${phone}] :: `,
          error.message,
          "\n---------------------------------------------\n"
        );
      }
      console.log("Sleeping for 1 second");
      await sleep(1);
    }
  } catch (error) {
    console.log("Error sending message:", error.message);
    throw error;
  } finally {
    console.log("All messages sent. Closing WhatsApp client.");
    await client.destroy();
  }
};

const InitializeWhatsappClient = async () => {
  try {
    const client = new WhatsappWeb.Client({
      authStrategy: new WhatsappWeb.LocalAuth(),
      puppeteer: {
        headless: false, // Set to true if you don't need to see the browser window
      },
      webVersion: "2.2409.2",
      webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html",
      },
    });

    client.on("qr", (qr) => {
      console.log("Login required, please scan the QR code:");
      console.log(qr); // You might want to generate a QR code image here
    });

    client.on("ready", async () => {
      console.log("WhatsApp client is ready. Starting to send messages...");
      await sendMessage(client);
    });

    await client.initialize();
  } catch (error) {
    console.log("Error initializing WhatsApp client:", error.message);
    throw error;
  }
};

export default InitializeWhatsappClient;
