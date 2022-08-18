require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");
//mongodb
require("./mongodb");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
//import routes
const users = require("./Routes/UserRoutes");
const rooms = require("./Routes/RoomsRoutes");
//Routes Middlewares
app.use("/api", users, rooms);

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log("server started in port", { port })
);

//socket io server initialization
const io = socket(server, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
    credentials: true,
  },
});
const Room = require("./Models/RoomsModel");

const changeStream = Room.watch();

changeStream.on("change", (change) => {
  console.log(change.updateDescription.updatedFields.noOfRoom);
  io.emit("changeData", change);
});
//connection to socket io server
io.on("connect", (socket) => {
  console.log(io.engine.clientsCount);
});
