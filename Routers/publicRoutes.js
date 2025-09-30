import express from "express";
import { registerfn, loginfn ,getcategory ,getproducts,getproductsbyid,logout } from "../Controllers/publiccontrollers.js";

const router = express.Router();

router.post("/register", registerfn);
router.post("/login", loginfn);
router.get("/category",getcategory)
router.get("/products",getproducts)
router.get("/products/:id",getproductsbyid)
router.post('/logout',logout)

export default router;
