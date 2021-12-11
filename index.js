const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/anonMessage';

app.use(express.json({ limit: '100mb' }));
app.use(cors());

app.use('/user', userRouter);
app.use('/message', messageRouter);

app.listen(process.env.PORT || 8000, async () => {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Mongo DB connected successfully!");
    }
  });
  console.log(`Listening at port ${process.env.PORT || 8000}`);
});