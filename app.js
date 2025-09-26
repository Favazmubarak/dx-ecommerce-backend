import express, { urlencoded } from "express";
import connectDB from "./Database/connectDB.js";
import session from "express-session";
import publicRoutes from "./Routers/publicRoutes.js";
import adminRoutes from "./Routers/adminRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;
connectDB(URI);

app.use(session({ secret: "favaz", resave: false, saveUninitialized: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(publicRoutes);
app.use(adminRoutes);

app.listen(PORT, () => {
  console.log("Server is Running...\n");
});
