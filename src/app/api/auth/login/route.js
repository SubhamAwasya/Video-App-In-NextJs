export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//my
import { fireStoreDB } from "@/helper/serverFirebase";

console.log("SigIn========================================================");

export async function POST(request) {
  const req = await request.json();

  try {
    // Find user in database
    const q = query(
      collection(fireStoreDB, "users"),
      where("email", "==", req.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      return new NextResponse(
        JSON.stringify({
          message: "You are not registered! please SignUp",
        })
      );
    }

    // User DATA and ID
    const firstDocument = querySnapshot.docs[0];
    const userData = firstDocument.data(); // Get the document
    const userId = firstDocument.id; // Get the document ID

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
      id: userId,
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

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "Login successful",
        data: { name: userData.name, email: userData.email },
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
