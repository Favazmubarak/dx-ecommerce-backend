import Users from "../models/userschema.js";
import Category from "../models/categoryschema.js";
import bcrypt from "bcrypt";
import Products from "../models/productschema.js";

//////////////// admin login fn /////////////////
async function adminfn(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Users.findOne({ email: email });

    if (!admin) {
      return res.status(400).json({ error: "Admin Not Found" });
    }
    if (admin.role != "Admin") {
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
async function adminviewusers(req, res) {
  try {
    const find = await Users.find({ role: "User" });
    res.status(200).json({ find });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
}

//////////////// add categories ///////////////////
async function addcategories(req, res) {
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

async function adminviewcategories(req,res) {
  try {
    const get = await Category.find()
    res.status(200).json(get)
  } catch (error) {
    console.log(error)
  }
}

//////////////  add  products  /////////////////////
async function addproducts(req, res) {
  try {
    const { name, price, description } = req.body;
    const add = await Products.create({name,price,description})
    res.status(200).json({add})
  } catch (error) {
    console.log(error);
    res.status(400).json("Not Added products")
  }
}
async function adminviewproducts(req,res){
  try {
    const get = await Products.find()
    res.status(200).json(get)
  } catch (error) {
    console.log(error)
  }
}


export { adminfn, adminviewusers, addcategories,addproducts ,adminviewcategories,adminviewproducts};
