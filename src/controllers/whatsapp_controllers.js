import users from "../utils/users.js";
import { sleep } from "../utils/sleep.js";
import WhatsappWeb from "whatsapp-web.js";
import student from "../Models/userModel.js";

const sendMessage = async (client, res) => {
  console.log("Sending messages, opening WhatsApp...");
  try {
    for (const user of users) {
      if (!user || !user.phoneNo || !user.name) continue;
      const phone = parseInt("+91" + user.phoneNo);
      const name = user.name.toUpperCase().trim();

      const message =
        "Hey *" +
        name +
        "*,\n\n" +
        "Your interview for the Optica JIIT Student Chapter is scheduled on *August 28th from 5 PM to 7 PM in G3 and G4* for both of your preferences. Your preferences are as follows:\n\n" +
        `• Preference 1 : \n \t ${user.pref1}\n` +
        `• Preference 2 : \n \t ${user.pref2}\n\n` +
        "*Please be present at the venue 15 minutes before the scheduled time.*\n\n" +
        "*Please bring your laptops or any relevant materials that showcase your work in the domain you're interested in.*\n\n" +
        "In case of any queries, feel free to contact us.\n\n" +
        "Rajat Bhati: 8595842343\n" +
        "Yash Mittal: 8570940287\n\n" +
        "Looking forward to seeing you there!\n\n" +
        "Join our WhatsApp group for updates: https://chat.whatsapp.com/JlpgCzdvYWr5DnYb8nL7M2\n\n" +
        "Regards,\n" +
        "Optica JIIT Student Chapter";

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
        const newStudent = new student({
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          pref1: user.pref1,
          pref2: user.pref2,
          emailSend: false,
          whatsappSend: true,
          emailSentAt: null,
          whatsappSentAt: Date.now(),
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

const setWhatsappMessage = async (req, res) => {};

export default InitializeWhatsappClient;
export { setWhatsappMessage };
