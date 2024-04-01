export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";
import jwt from "jsonwebtoken";
//my
import { fireStoreDB } from "@/helper/serverFirebase";

console.log(
  "Token Login========================================================"
);

export async function GET(request) {
  try {
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json("You Don't Have access token", {
        status: 401,
      });
    }

    // Decode Access Token
    let decodedToken;
    try {
      decodedToken = await jwt.decode(token);
    } catch (error) {
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    // Find user in database
    const docRef = doc(fireStoreDB, "users", decodedToken?.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json("Invalid Token", { status: 401 });
    }
    const userData = docSnap.data();
    // Generate Access and Refresh token
    const userForJWT = {
      id: decodedToken?.id,
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
