const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
process.on("uncaughtException", (err) => {
  console.error(err.stack);
  process.exit(1);
});

dotenv.config({ path: "./config.env", override: true });

const app = require("./app");

const db = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {}).then((con) => {
  console.log(`Name of the database is ${con.connection.name}`);
  console.log("Successfully connected to the database");
});


const portnumber = process.env.PORT || 3000;
const server = app.listen(portnumber, () => {
  console.log(`App is running on port ${portnumber}`);
});

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});