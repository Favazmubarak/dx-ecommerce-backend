import Users from "../models/userschema.js";
import bcrypt from "bcrypt"


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

export {adminfn}
