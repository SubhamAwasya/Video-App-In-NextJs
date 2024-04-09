import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/server/models/User";
import { connectDB } from "@/server/utils/db";
//my

console.log("SigIn========================================================");

connectDB();

export async function POST(request) {
  const req = await request.json();

  try {
    // Find user in database
    const userData = await User.findOne({
      email: req.email,
    });

    if (!userData) {
      return new NextResponse(
        JSON.stringify({
          message: "You are not registered",
        })
      );
    }

    // Checking Password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      req.password,
      userData.password
    );
    if (!isPasswordCorrect) {
      return new NextResponse(
        JSON.stringify({
          message: "Wrong Password",
        })
      );
    }

    // Generate Access and Refresh token
    const userForJWT = {
      id: userData.id,
      email: userData.email,
    };

    // Access Token
    const accessToken = await jwt.sign(
      userForJWT,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    // Refresh Token
    // const refreshToken = await jwt.sign(
    //   userForJWT,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   {
    //     expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    //   }
    // );

    // Saprate user data and password

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "Login successful",
        data: userData,
      })
    );
    // Setting Cookies
    res.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
    });

    return res;
  } catch (e) {
    console.error("Error in Login ", e);
  }
}
