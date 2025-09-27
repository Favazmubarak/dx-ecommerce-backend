import express from "express";

import { addcart } from "../Controllers/usercontrollers.js";

const router = express.Router()

router.post("/cart",addcart)

export default router