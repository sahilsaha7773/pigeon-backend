const Mongoose = require("mongoose");
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
exports.deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (Mongoose.Types.ObjectId(req.user.userId).toString() === msg.user.toString()) {
      const message = await Message.findByIdAndDelete(req.params.id);
      res.status(200).json(respMessage(true, message, "Message deleted"));
    }
    else {
      res.status(400).json(respMessage(false, "You are not allowed to delete this message"));
    }
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