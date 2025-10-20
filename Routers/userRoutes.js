import express from "express";

import { addcart ,getcart,updatecart,deletecart,postOrders, getordersbyid,getOrders} from "../Controllers/usercontrollers.js";
import { isAuth } from "../middlewares/autnetication.js";

const router = express.Router()

router.use("/cart", isAuth);
router.post("/cart",addcart)
router.get("/cart",getcart)
router.put("/cart/:id",updatecart)
router.delete("/cart/:userId",deletecart)

router.use("/orders", isAuth);
router.post("/orders",postOrders)
router.get("/orders/:id",getordersbyid)
router.get("/orders",getOrders)


export default router