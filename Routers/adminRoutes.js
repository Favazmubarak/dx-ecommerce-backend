import multer from "multer";
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
  adminDisableUsers,
  loadhome,
} from "../Controllers/admincontrollers.js";
import fs from "fs";
import path from "path";
import { isAdmin } from "../middlewares/autnetication.js";
const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const uploads = multer({ storage });

router.post("/reg", adminfn);
router.use(isAdmin);
router.get("/users", adminviewusers);
router.get("/loadhome", loadhome);

router.post("/products", uploads.single("image"), addproducts);
router.get("/products", adminviewproducts);
router.put("/products/:id",uploads.single("image"), adminUpdateProducts);
router.delete("/products/:id", adminDeleteProducts);

router.post("/categories", addcategories);
router.get("/categories", adminviewcategories);
router.put("/categories/:id", adminUpdateCategories);
router.delete("/categories/:id", adminDeleteCategories);

router.get("/orders", adminViewOrders);
router.put("/orders/:id", adminUpdateOrders);
router.delete("/orders/:id", adminDeleteOrders);

router.post("/users/:id/enable", adminEnableUsers);
router.post("/users/:id/disable", adminDisableUsers);

export default router;
