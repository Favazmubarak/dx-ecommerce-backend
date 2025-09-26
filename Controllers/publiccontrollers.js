import Users from "../models/userschema.js";
import Category from "../models/categoryschema.js";
import bcrypt from "bcrypt"


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


async function getcategory(req, res) {
  try {
    const cat = await Category.find();
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
}



export { registerfn, loginfn ,getcategory };
