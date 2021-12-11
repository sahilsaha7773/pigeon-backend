const verifyToken = require('../middlewares/verifyToken');
const messageController = require('../controllers/messageController');
const messageRouter = require('express').Router();

messageRouter.post('/create', messageController.createMessage);
messageRouter.get('/get', verifyToken, messageController.getMessages);
messageRouter.put('/delete/:id', verifyToken, messageController.deleteMessage);

module.exports = messageRouter;