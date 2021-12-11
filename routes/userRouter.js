const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/get', verifyToken, userController.getUser);

module.exports = userRouter;