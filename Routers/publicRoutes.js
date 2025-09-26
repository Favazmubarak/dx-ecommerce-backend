import express from "express";
import { registerfn, loginfn ,getcategory } from "../Controllers/publiccontrollers.js";

const router = express.Router();

router.post("/register", registerfn);
router.post("/login", loginfn);
router.get("/category",getcategory)

export default router;
