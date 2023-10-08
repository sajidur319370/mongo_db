// imported package
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();

// Creating App with middleware
const app = express();
app.use(cors());
app.use(express.json());

// Creating Port
const port = process.env.PORT || 8080;

// Import file from other folder
const toolsRoute = require("./routes/v1/tools.route");
const { connectToDb } = require("./utils/dbConnect");
const { errorHandler } = require("./middleware/errorHandler");

// DB Connection
connectToDb((error) => {
  if (!error) {
    app.listen(port, () => {
      console.log(`Server is runnin on ${port}`.magenta.bold);
    });
  } else {
    console.log(error);
  }
});

// CRUD opearation
app.use("/api/v1/tools", toolsRoute);

app.all("*", (req, res) => {
  res.send("No route found!");
});

// app.listen(port, () => {
//   console.log(`Server is runnin on ${port}`.magenta.bold);
// });
app.use(errorHandler);
process.on("unhandledRejection", (error) => {
  // console.log("Error name:", error.name);
  // console.log("Error message:", error.message);
  app.close(() => {
    process.exit(1);
  });
});
