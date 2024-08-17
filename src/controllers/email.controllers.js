import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import users from "../utils/users.js"; // Ensure this path is correct

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.APP_PASSWORD,
  },
});

// Set up handlebars as the template engine for Nodemailer
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/templates"), // Corrected path to template directory
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/templates"), // Corrected path to template directory
    extName: ".handlebars",
  })
);

const sendMail = async () => {
  try {
    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: user.email,
        subject: "Test Email", // Write subject here
        template: "email",
        context: {
          title: "Test Email", // Write title here (Does not matter)
          message: "This is a test email", // Write message here
          imageUrl: "cid:unique@nodemailer.com",
        },
        attachments: [
          {
            filename: "test.jpeg",
            path: path.resolve("./src/images/test.jpeg"), // Corrected path to the image
            cid: "unique@nodemailer.com", // same cid value as in the html img src
          },
          // Can attach any number of files
        ],
      };

      console.log("Sending mail to", user.email);
      try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent to", user.email);
      } catch (error) {
        console.log("Error in sending mail", error);
      }
    }
  } catch (error) {
    console.log("Error in sending mail", error);
  } finally {
    transporter.close();
  }
};

export default sendMail;
