import express from "express"
import { adminfn } from "../Controllers/admincontrollers.js"

const router = express.Router()

router.post("/admin",adminfn)

export default router