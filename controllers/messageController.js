const Message = require("../models/Message");
const respMessage = require("../utils/respMessage");

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(200).json(respMessage(true, message, "Message created"));
  } catch (error) {
    res.status(400).json(respMessage(false, error.message));
  }
}

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.userId }).sort({
      createdAt: -1
    });
    res.status(200).json(respMessage(true, messages, "Messages fetched"));
  } catch (error) {
    res.status(400).json(respMessage(false, error.message));
  }
}