// app.js

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { createUser, login } from "../controllers/auth";
import auth from "../middleware/auth";


const app = express();



import "dotenv/config";
console.log(process.env.NODE_ENV);

/* write in terminal:
node -e "console.log(require("crypto").randomBytes(32).toString("hex"));"
*/

// some routes don"t require auth
// for example, register and login
app.post("/signup", createUser);
app.post("/signin", login);

// authorization
app.use(auth);

// these routes need auth
app.use("/cards", require("./routes/cards"));

// app.post("/cards", auth, createCard);  another way to do this