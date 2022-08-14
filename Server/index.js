require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//mongodb
require("./mongodb");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.BASE_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
//import routes
const users = require("./Routes/UserRoutes");
//Routes Middlewares
app.use("/api", users);

const port = process.env.PORT;
app.listen(port, () => console.log("server started in port", { port }));
