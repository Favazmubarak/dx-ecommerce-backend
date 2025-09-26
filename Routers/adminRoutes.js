import express from "express"
import { adminfn ,adminviewusers,addcategories,addproducts } from "../Controllers/admincontrollers.js"

const router = express.Router()

router.post("/admin",adminfn)
router.get("/viewuser",adminviewusers)
router.post("/addcat",addcategories)
router.post("/addpro",addproducts)


export default router