export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";
import jwt from "jsonwebtoken";
//my
import { fireStoreDB } from "@/helper/firebase";

console.log("LogOut========================================================");

export async function GET(request) {
  try {
    // Extracting Access Token from request
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json("You Don't Have access token", { status: 401 });
    }

    // Decode Access Token
    let decodedToken;
    try {
      decodedToken = await jwt.decode(accessToken);
    } catch (error) {
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    // Find user in database
    const docRef = doc(fireStoreDB, "users", decodedToken?.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "Log Out successful",
      })
    );
    // Setting Cookies
    res.cookies.delete("accessToken");
    return res;
  } catch (e) {
    console.error("Error in Logout ", e);
  }
}
