import express from "express";
import {
  adminfn,
  adminviewusers,
  addcategories,
  addproducts,
  adminviewcategories,
  adminviewproducts,
  adminUpdateProducts,
  adminDeleteProducts,
  adminAddCategories,
  adminUpdateCategories,
  adminViewCategories,
  adminDeleteCategories,
  adminViewOrders,
  adminUpdateOrders,
  adminDeleteOrders,
  adminEnableUsers,
  adminDisableUsers
} from "../Controllers/admincontrollers.js";
import { isAdmin } from "../middlewares/autnetication.js";
const router = express.Router();

router.post("/reg", adminfn);
router.use(isAdmin)
router.get("/users", adminviewusers);

router.post("/products", addproducts);
router.get("/products", adminviewproducts);
router.put("/products/:id", adminUpdateProducts);
router.delete("/products/:id", adminDeleteProducts);

router.post("/categories", addcategories);
router.get("/categories", adminviewcategories);
router.put("/categories/:id", adminUpdateCategories);
router.delete("/categories/:id", adminDeleteCategories);

router.get("/orders",adminViewOrders)
router.put("/orders/:id",adminUpdateOrders)
router.delete("/orders/:id",adminDeleteOrders)


router.post('/users/:id/enable',adminEnableUsers)
router.post('/users/:id/disable',adminDisableUsers)

export default router;
