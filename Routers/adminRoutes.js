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

const router = express.Router();

router.post("/admin", adminfn);
router.get("/admin/users", adminviewusers);
router.post("/admin/categories", addcategories);
router.post("/admin/products", addproducts);
router.get("/admin/categories", adminviewcategories);
router.get("/admin/products", adminviewproducts);
router.put("/admin/products/:id", adminUpdateProducts);
router.delete("/admin/products/:id", adminDeleteProducts);

router.get("/categories", adminViewCategories);
router.post("/categories", adminAddCategories);
router.put("/categories/:id", adminUpdateCategories);
router.delete("/categories/:id", adminDeleteCategories);

router.get("/admin/orders",adminViewOrders)
router.put("/admin/orders",adminUpdateOrders)
router.delete("/admin/orders",adminDeleteOrders)


router.post('/users/:id/enable',adminEnableUsers)
router.post('/users/:id/disable',adminDisableUsers)

export default router;
