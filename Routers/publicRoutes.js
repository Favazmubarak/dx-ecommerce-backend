import express from "express";
import { registerfn, loginfn ,getcategory ,getproducts,getproductsbyid,logout,getCategoriesProducts } from "../Controllers/publiccontrollers.js";
import { validateLogin, validateRegister } from "../middlewares/validation.js";
import Category from "../models/categoryschema.js";

const router = express.Router();

router.post("/register",validateRegister, registerfn);
router.post("/login", validateLogin, loginfn);
router.get("/category",getcategory)
router.get("/category/find/:id",getCategoriesProducts);
router.get("/products",getproducts)
router.get("/products/:id",getproductsbyid)
router.delete('/logout',logout)

export default router;
