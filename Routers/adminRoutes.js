import express from "express"
import { adminfn ,adminviewusers,addcategories,addproducts,adminviewcategories, adminviewproducts } from "../Controllers/admincontrollers.js"

const router = express.Router()

router.post("/admin",adminfn)
router.get("/admin/users",adminviewusers)
router.post("/admin/categories",addcategories)
router.post("/admin/products",addproducts)
router.get("/admin/categories",adminviewcategories)
router.get("/admin/products",adminviewproducts)


export default router