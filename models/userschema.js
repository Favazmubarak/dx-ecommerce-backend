import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },

    email: { type: String, required: true, lowercase: true, unique: true },

    password: { type: String, required: true },

    role: { type: String, enum: ["User", "Admin"], default: "User" },

    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);

export default Users;
