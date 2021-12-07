const express = require("express");
const cors = require("cors");
require("dotenv").config(); //for env
require("./db/connectDB");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// routes

const authRoutes = require("./routes/auth");
const listRoute = require("./routes/movieList");
const movieRoute = require("./routes/movie");
const lastWatched = require("./routes/lastWatched");

app.use(express.json());
app.use(cors());

//middlewares

app.use("/api", authRoutes);
app.use("/mov", movieRoute);
app.use("/list", listRoute);
app.use("/last", lastWatched);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
