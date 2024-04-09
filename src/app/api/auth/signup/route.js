import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import User from "@/server/models/User";
import bcrypt from "bcrypt";
//my

console.log("SignUp========================================================");

connectDB();

export async function POST(request) {
  const req = await request.json();
  try {
    // Find user in database
    const user = await User.findOne({ email: req.email });
    if (user) {
      return new NextResponse(
        JSON.stringify({
          message: "User already exists",
        })
      );
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.password, salt);

    // Storing data in fireStore DB
    const newUser = await User.create({
      name: req.name,
      email: req.email,
      password: hashedPassword,
    });
    console.log(newUser);

    // Is data stored successfully
    if (!newUser || !newUser._id) {
      return new NextResponse(
        JSON.stringify({
          message: "Failed to store data in firebase",
        })
      );
    }

    // Sending response
    return new NextResponse(
      JSON.stringify({
        message: "SignUp successful",
      })
    );
  } catch (error) {
    console.error("Error adding document: ", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while signing up",
      })
    );
  }
}
