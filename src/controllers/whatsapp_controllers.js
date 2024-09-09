import users from "../utils/users.js";
import { sleep } from "../utils/sleep.js";
import WhatsappWeb from "whatsapp-web.js";
import student from "../Models/userModel.js";

let whatsappmsg = "";
let eventdetails = {};

const replaceWhatsappPlaceholders = (template, user) => {
  return template.replace(/{(\w+)}/g, (match, p1) => {
    // Check if user object has the property p1
    if (user.hasOwnProperty(p1)) {
      return user[p1]; // Replace with the user's property value
    } else {
      return match; // If property doesn't exist, return the original placeholder
    }
  });
};

const sendMessage = async (client, res) => {
  console.log("Sending messages, opening WhatsApp...");
  try {
    for (const user of users) {
      if (!user || !user.phoneNo || !user.name) continue;
      const phone = parseInt("+91" + user.phoneNo);
      const name = user.name.toUpperCase().trim();

      const message = replaceWhatsappPlaceholders(whatsappmsg, user);

      console.log("Sending message to :: ", phone);
      res.write(
        `data: ${JSON.stringify({
          name: user.name,
          phoneNo: user.phoneNo,
          email: user.email,
          messageSent: "sending",
        })}\n\n`
      );
      try {
        await client.sendMessage(`${phone}@c.us`, message);

        res.write(
          `data: ${JSON.stringify({
            phoneNo: user.phoneNo,
            messageSent: "yes",
          })}\n\n`
        );
      } catch (error) {
        console.log(`ERR [${phone}] :: `, error.message);
        res.write(
          `data: ${JSON.stringify({
            phoneNo: user.phoneNo,
            messageSent: "no",
          })}\n\n`
        );
      }
      // save the data in database
      try {
        console.log("event data is: ", eventdetails);
        const newStudent = new student({
          name: user.name,
          email: user.email || "not available",
          phoneNo: user.phoneNo,
          emailSend: false,
          whatsappSend: true,
          emailSentAt: null,
          whatsappSentAt: Date.now(),
          eventName: eventdetails.eventname,
          eventDate: eventdetails.eventdate,
        });
        await newStudent.save();
      } catch (err) {
        console.log(err);
      }

      console.log("Sleeping for 1 second");
      await sleep(1);
    }
  } catch (error) {
    console.log("Error sending message:", error.message);
    res.write(
      `data: ${JSON.stringify({
        message: "Error in sending whatsapp messages.",
        error: error.message,
      })}\n\n`
    );
    throw error;
  } finally {
    console.log("All messages sent. Closing WhatsApp client.");
    res.write('data: {"message": "All messages processed."}\n\n');
    // await client.destroy();
  }
};

// const checkAuth = async () => {
//   return new Promise((resolve) => {
//     const client = new WhatsappWeb.Client({
//       authStrategy: new WhatsappWeb.LocalAuth(),
//       puppeteer: { headless: true }, // Show the browser window
//     });

//     client.on('ready', async () => {
//       console.log("WhatsApp client authenticated.");
//       await client.destroy();
//       resolve(true);
//     });

//     client.on('auth_failure', async (msg) => {
//       console.error("Authentication failure:", msg);
//       await client.destroy();
//       resolve(false);
//     });

//     client.initialize();
//   });
// };

const InitializeWhatsappClient = async (res) => {
  try {
    console.log("Initializing WhatsApp client...");
    // const isAuthenticated = await checkAuth();
    // console.log("isAuthenticated :: ", isAuthenticated);
    const client = new WhatsappWeb.Client({
      authStrategy: new WhatsappWeb.LocalAuth(),
      puppeteer: { headless: false }, // Set to true if authenticated
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
      await sendMessage(client, res);
      // plz don;t make whole api clos i want this route of api close
      res.end();
      // process.exit(0);
    });

    await client.initialize();

    // i want not to disclose the whatsapp web screen
  } catch (error) {
    console.log("Error initializing WhatsApp client:", error.message);
    throw error;
  }
};

const setWhatsappMessage = async (req, res) => {
  const { eventdetail, whatsappMessage } = req.body;
  console.log("event detail and msg is:", eventdetail, whatsappMessage);
  whatsappmsg = whatsappMessage;
  eventdetails = eventdetail;
  try {
    res.status(200).json({
      message: "whatsapp data send succesfully.",
    });
  } catch (err) {
    console.error("Error while receiving whatsapp data: ", err);
    res.status(500).json({
      message: "Internal server error while receiving whatsapp data.",
    });
  }
};

export default InitializeWhatsappClient;
export { setWhatsappMessage };
