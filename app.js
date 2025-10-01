import express from "express";
import connectDB from "./Database/connectDB.js";
import session from "express-session";
import publicRoutes from "./Routers/publicRoutes.js";
import adminRoutes from "./Routers/adminRoutes.js";
import userRoutes from "./Routers/userRoutes.js";
import dotenv from "dotenv";
import MongoStore from "connect-mongo"
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;
connectDB(URI);

app.use(
  session({
    secret: "favaz",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: URI,
      collectionName: "sessions",
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(publicRoutes);
app.use("/admin", adminRoutes);
app.use("/",userRoutes);

app.listen(PORT, () => {
  console.log("Server is Running...\n");
});
