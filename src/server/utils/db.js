import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // Already connected
    }

    await mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  } catch (error) {
    console.error("Not able to connect to MongoDB:", error);
    process.exit(1);
  }
}
