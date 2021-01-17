const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const userRoute = require("./server/routes/user");
const dailyEmissionRouter = require("./server/routes/dailyEmission");
const monthlyEmissionRouter = require("./server/routes/monthlyEmission");
const commentsRouter = require("./server/routes/comments");
const chatsRouter = require("./server/routes/chats");
require("dotenv").config();

const app = express();
const uri = process.env.MONGO_URI;
//const uri = 'mongodb://127.0.0.1:27017/decarbonate';
const port = process.env.PORT || 8080;

app.use(morgan("tiny"));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(userRoute);
app.use(dailyEmissionRouter);
app.use(monthlyEmissionRouter);
app.use(chatsRouter);
app.use(commentsRouter);
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: "true",
});

mongoose.set("useUnifiedTopology", true);

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});



app.listen(port, () => {
  console.log(`Running at Port ${port}`);
});
