import express from "express";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config();

// import conn.mjs so that i connect to my db
import db from "./db/conn.mjs";
//import cors so that my frontend and back end can communicate
import cors from "cors";

// import my routes from their folders
import brainEntries from "./routes/brain.mjs";
import CalenderEntries from "./routes/entry.mjs";
import TodoEntries from "./routes/todo.mjs";
import users from "./routes/user.mjs";

// set up port
const PORT = process.env.PORT || 5050;

//create app
const app = express();

// middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(
    "<h1>Calender API</h1><ol>endpoints: <br/><li> brain dump - /api/braindump</li> <li> entries - /api/calendar</li> <li> todos - /api/todos</li> <ol>"
  );
});

// fill in my endpoint routes - but they will be in their own folders
app.use("/api/braindump", brainEntries);
app.use("/api/calendar", CalenderEntries);
app.use("/api/todos", TodoEntries);
app.use("/api/users", users);

// default, catch-all route
app.get("/*", (req, res) => {
  res.redirect("/");
});

//Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("there was an issue on the server");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
