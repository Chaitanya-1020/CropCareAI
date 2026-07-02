const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");

process.on("uncaughtException", (err) => {
  console.error(err.stack);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then((con) => {
    console.log(`Name of the database is ${con.connection.name}`);
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:");
    console.error(err);
    process.exit(1);
  });

const portnumber = process.env.PORT || 3000;

const server = app.listen(portnumber, () => {
  console.log(`App is running on port ${portnumber}`);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  server.close(() => process.exit(1));
});