import mongoose from "mongoose";

async function connectDB(URI) {
  try {
    await mongoose.connect(URI);
    console.log("Database-Connected");
  } catch (error) {
    console.log(error);
  }
}

export default  connectDB ;
