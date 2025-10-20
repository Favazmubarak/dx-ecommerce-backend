import Users from "../models/userschema.js";
import Category from "../models/categoryschema.js";
import Products from "../models/productschema.js";
import bcrypt from "bcrypt";

//////////// Register For New Users /////////////
async function registerfn(req, res) {
  try {
    const { username, email, password, password2 } = req.body;

    const existinguser = await Users.findOne({
      $or: [{ username }, { email }],
    });

    if (existinguser) {
      return res.status(400).json({ error: "username or Email already exist" });
    }
    if (password != password2) {
      console.log(req.body);
      
      return res.status(400).json({ error: "Enter Same Password" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newuser = await Users.create({
      username: username,
      email: email,
      password: hashed,
    });
    res.status(200).json({
      message: "New user register Succesfully",
      id: newuser.id,
      name: newuser.username,
      password: newuser.password,
    });
  } catch (error) {
    console.log(error);
  }
}

///////////// Login Existing User ////////////////
async function loginfn(req, res) {
  try {
    const { email, password } = req.body;
    const check = await Users.findOne({ email: email });

    if (!check) {
      return res.status(400).json({ error: "User not Found" });
    }
    const matched = await bcrypt.compare(password, check.password);
    if (!matched) {
      return res.status(400).json({ error: "Wrong Password" });
    }
    if (check.role == "Admin") {
      return res.status(400).json({ error: "You are admin use your page" });
    }
    req.session.userId = check._id;
    req.session.role = check.role;
    console.log(req.session);

    return res.status(200).json({
      message: "login Completed", //, session: req.session.role
    });
  } catch (error) {
    console.log(error);
  }
}

///////////// get category ///////////////////////

async function getcategory(req, res) {
  try {
    const cat = await Category.find();
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
}

////////////// get products  /////////////////////

async function getproducts(req, res) {
  try {
    const result = await Products.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

//////////////// get products by id //////////////////

async function getproductsbyid(req, res) {
  try {
    const id = req.params.id;
    const products = await Products.findById(id).populate("category_id");
    if (!products) {
      res.status(404).json("products Not Found");
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
}
function logout(req, res) {
  req.session.destroy(() => {
    res.status(200).json({ message: "logout successfull" });
  });
}

//////////////////////////// category by id //////////////////
async function getCategoriesProducts(req,res) {
  
  try {
    const catid = req.params.id
    const products  = await Products.find({category_id:catid})
    if (products.length <= 0) {
      console.log(products);
      return res.status(404).json({ message: 'No products found for this category' });
      
    }
    res.status(200).json(products)
} catch (error) {
      res.status(500).json({ error: 'server errror' });
}
}


export {
  registerfn,
  loginfn,
  getcategory,
  getproducts,
  getproductsbyid,
  logout,
  getCategoriesProducts
};
