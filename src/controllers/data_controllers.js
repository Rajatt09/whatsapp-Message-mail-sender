import Student from "../Models/userModel.js";

const getMailsMessagesHistory = async (req, res) => {
  try {
    const users = await Student.find();
    console.log("users are: ", users);
    res.status(200).json({
      message: "mail and messages history retrieved successfully.",
      data: users,
    });
  } catch (err) {
    console.error("Error while fetching mail and messages history: ", err);
    res.status(500).json({
      message: "Internal server error while fetching mails and messages.",
    });
  }
};

export { getMailsMessagesHistory };
