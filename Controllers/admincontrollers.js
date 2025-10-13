import Users from "../models/userschema.js";
import Category from "../models/categoryschema.js";
import bcrypt from "bcrypt";
import Products from "../models/productschema.js";
import Order from "../models/orders.js";
// import multer from "multer";


//////////////// admin login fn /////////////////
export async function adminfn(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Users.findOne({ email: email });

    if (!admin) {
      return res.status(400).json({ error: "Admin Not Found" });
    }
    if (admin.role !== "Admin") {
      return res.status(400).json({ error: "Admins-Only..." });
    }
    const hashed = await bcrypt.compare(password, admin.password);

    if (!hashed) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    req.session.adminId = admin._id;
    req.session.role = admin.role;
    console.log(req.session);

    return res.status(200).json({ message: "Admin Entered..." });
  } catch (error) {
    console.log(error);
  }
}

///////////////// admin view users ///////////////////
export async function adminviewusers(req, res) {
  try {
    const find = await Users.find({ role: "User" });
    res.status(200).json({ find });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
}

//////////////// add categories ///////////////////
export async function addcategories(req, res) {
  try {
    const { name, description } = req.body;
    const result = await Category.create({ name, description });
    res.status(200).json({ result });
    if (!result) {
      res.status(500).json("Category Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Not Added Category");
  }
}

/////////////// view categories  //////////////////////

export async function adminviewcategories(req, res) {
  try {
    const get = await Category.find();
    res.status(200).json(get);
  } catch (error) {
    console.log(error);
  }
}

//////////////  add  products  /////////////////////

export async function addproducts(req, res) {
  try {
    console.log(req.file);
    
    const { name, price, description} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null 
    const add = await Products.create({ name, price, description,image});
    res.status(200).json({ add });
  } catch (error) {
    console.log(error);
    res.status(400).json("Not Added products");
  }
}
//////////////// view products ///////////////////
export async function adminviewproducts(req, res) {
  try {
    const get = await Products.find();
    res.status(200).json(get);
  } catch (error) {
    console.log(error);
  }
}

///////////////// update products   ///////////////////
export async function adminUpdateProducts(req, res) {
  try {
    const needtoupdate = req.body;
    const id = req.params.id;
    const updated = await Products.findByIdAndUpdate(id, needtoupdate, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "errror Happens" });
  }
}

/////////////// delete products //////////////////////
export async function adminDeleteProducts(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Products.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ message: "no object found to delete." });
    }
    res.status(200).json({ deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "errror happens" });
  }
}

///////////////// crud category      //////////////////////

export async function adminViewCategories(req, res) {
  try {
    const result = await Category.find();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error happens" });
  }
}

export async function adminAddCategories(req, res) {
  try {
    const { name, description } = req.body;
    const result = await Category.create({ name, description });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error happens" });
  }
}

export async function adminUpdateCategories(req, res) {
  try {
    const id = req.params.id;
    const toupdate = req.body;
    const updated = await Category.findByIdAndUpdate(id, toupdate, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error-happens" });
  }
}

export async function adminDeleteCategories(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ message: "no object found to delete." });
    }
    res.status(200).json({ deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error-happens" });
  }
}

//////////////////// Admin Orders Side  ///////////////

export async function adminViewOrders(req, res) {
  try {
    const orders = await Order.find().populate("user_id");
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " error-happens" });
  }
}

export async function adminUpdateOrders(req, res) {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error happens" });
  }
}

export async function adminDeleteOrders(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Order.findByIdAndDelete(id);
    res.json({ deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error happens" });
  }
}

///////////// enable/disable //////////////////
export async function adminEnableUsers(req, res) {
  try {
    const id = req.params.id;
    const updated = await Users.findByIdAndUpdate(
      id,
      { isEnabled: true },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Happens" });
  }
}

export async function adminDisableUsers(req, res) {
  try {
    const id = req.params.id;
    const updated = await Users.findByIdAndUpdate(
      id,
      { isEnabled: false },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Happens" });
  }
}
export async function loadhome(req, res) {
  try {
    const userCount = await Users.countDocuments();
    const productCount = await Products.countDocuments();
    const orderCount = await Order.countDocuments();
    const categoryCount = await Category.countDocuments();
    res
      .status(200)
      .json({ userCount, productCount, orderCount, categoryCount });
  } catch (error) {
    res.status(400).json({ error: "from serverside error" });
  }
}