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

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/templates"),
    extName: ".handlebars",
  })
);

const sendMail = async (res) => {
  try {
    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: user.email,
        subject: "Test Email",
        template: "email",
        context: {
          title: "Test Email",
          message: "This is a test email",
          imageUrl: "cid:unique@nodemailer.com",
        },
        attachments: [
          {
            filename: "test.jpeg",
            path: path.resolve("./src/images/test.jpeg"),
            cid: "unique@nodemailer.com",
          },
        ],
      };

      // Notify client that email sending is starting
      res.write(`data: ${JSON.stringify({ name: user.name, email: user.email, phoneNo: user.phoneNo, emailSent: "sending" })}\n\n`);

      try {
        await transporter.sendMail(mailOptions);
        // Notify client that email has been sent successfully
        res.write(`data: ${JSON.stringify({ email: user.email, emailSent: "yes" })}\n\n`);
      } catch (error) {
        // Notify client if there's an error sending the email
        res.write(`data: ${JSON.stringify({ email: user.email, emailSent: "no", error: error.message })}\n\n`);
      }
    }

    // Notify client that all emails have been processed
    res.write('data: {"message": "All mails processed"}\n\n');
  } catch (error) {
    // Notify client if there's a general error
    res.write(`data: ${JSON.stringify({ message: "Error in sending mails", error: error.message })}\n\n`);
  } finally {
    res.end(); // End the response
    transporter.close(); // Close the transporter after all operations
  }
};

export default sendMail;
