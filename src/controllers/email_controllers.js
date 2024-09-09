import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import users from "../utils/users.js"; // Ensure this path is correct
import Student from "../Models/userModel.js";

let mailmsg = "";
let eventdetails = {};

const replaceMailPlaceholders = (template, user) => {
  return template.replace(/{(\w+)}/g, (match, p1) => {
    // Check if user object has the property p1
    if (user.hasOwnProperty(p1)) {
      return user[p1]; // Replace with the user's property value
    } else {
      return match; // If property doesn't exist, return the original placeholder
    }
  });
};

function formatMessage(plainText) {
  // Replace new lines with <br> tags
  let formattedText = plainText.replace(/\n/g, "<br>");

  // Replace **text** with <strong>text</strong> for bold
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  // Replace _text_ with <em>text</em> for italics (optional)
  formattedText = formattedText.replace(/_(.*?)_/g, "<em>$1</em>");

  return formattedText;
}

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
  console.log("called");
  try {
    for (const user of users) {
      let message = replaceMailPlaceholders(mailmsg, user);
      console.log("msg is: ", message);
      message = formatMessage(message);
      console.log("updated msg: ", message);
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: user.email,
        subject: " JIIT Optica Interview Details",
        template: "email",
        context: {
          title: "JIIT Optica Interview Details",
          message: message,
          imageUrl: "cid:unique@nodemailer.com",
        },
        // attachments: [
        //   {
        //     filename: "test.jpeg",
        //     path: path.resolve("./src/images/test.jpeg"),
        //     cid: "unique@nodemailer.com",
        //   },
        // ],
      };

      // Notify client that email sending is starting
      res.write(
        `data: ${JSON.stringify({
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          emailSent: "sending",
        })}\n\n`
      );

      try {
        await transporter.sendMail(mailOptions);
        // Notify client that email has been sent successfully
        res.write(
          `data: ${JSON.stringify({ email: user.email, emailSent: "yes" })}\n\n`
        );
        // save the data in database
        try {
          const newStudent = new Student({
            name: user.name,
            email: user.email,
            phoneNo: user.phoneNo,
            emailSend: true,
            whatsappSend: false,
            emailSentAt: Date.now(),
            whatsappSentAt: null,
            eventName: eventdetails.eventname,
            eventDate: eventdetails.eventdate,
          });
          await newStudent.save();
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        // Notify client if there's an error sending the email
        res.write(
          `data: ${JSON.stringify({
            email: user.email,
            emailSent: "no",
            error: error.message,
          })}\n\n`
        );
      }
    }

    // Notify client that all emails have been processed
    res.write('data: {"message": "All mails send."}\n\n');
  } catch (error) {
    // Notify client if there's a general error
    res.write(
      `data: ${JSON.stringify({
        message: "Error in sending mails.",
        error: error.message,
      })}\n\n`
    );
  } finally {
    res.end(); // End the response
    transporter.close(); // Close the transporter after all operations
  }
};

const setMailMessage = async (req, res) => {
  const { eventdetail, mailMessage } = req.body;
  console.log("event detail and msg is:", eventdetail, mailMessage);
  mailmsg = mailMessage;
  eventdetails = eventdetail;
  try {
    res.status(200).json({
      message: "mail data send succesfully.",
    });
  } catch (err) {
    console.error("Error while receiving mail data: ", err);
    res.status(500).json({
      message: "Internal server error while receiving mail data.",
    });
  }
};

export default sendMail;
export { setMailMessage };
