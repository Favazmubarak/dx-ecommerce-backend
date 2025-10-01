import express from "express";
import { registerfn, loginfn ,getcategory ,getproducts,getproductsbyid,logout } from "../Controllers/publiccontrollers.js";
import { validateLogin, validateRegister } from "../middlewares/validation.js";

const router = express.Router();

router.post("/register",validateRegister, registerfn);
router.post("/login", validateLogin, loginfn);
router.get("/category",getcategory)
router.get("/products",getproducts)
router.get("/products/:id",getproductsbyid)
router.post('/logout',logout)

export default router;
