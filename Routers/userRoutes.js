import express from "express";

import { addcart ,getcart,updatecart,deletecart,getorders,postOrders} from "../Controllers/usercontrollers.js";

const router = express.Router()

router.post("/cart",addcart)
router.get("/cart",getcart)
router.put("/cart/:userId",updatecart)
router.delete("/cart/:userId",deletecart)
router.get("orders",getorders)
router.post("orders",postOrders)


export default router