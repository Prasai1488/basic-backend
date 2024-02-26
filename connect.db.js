import mongoose from "mongoose";

const dbURL =
  "mongodb+srv://prasaiprithvi4:Vianet_%4095945@cluster0.y7flm8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`DB collection failed: ${error.message}`);
  }
};

export default connectDB;
