import User from "@/server/models/User";
import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//my

console.log(
  "Update Profile========================================================"
);

connectDB();

export async function PUT(request) {
  try {
    const req = await request.json();
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json("Unauthorized", {
        status: 401,
      });
    }

    let decodedToken;
    try {
      decodedToken = await jwt.decode(token);
    } catch (error) {
      console.log(error);
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    // Find user in database and update profileUrl
    const user = await User.findById(decodedToken?.id);
    user.profileImg = req.profileUrl;
    const updatedUser = await user.save({ new: true });

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "Profile Updated Successfully!",
        data: updatedUser,
      })
    );

    return res;
  } catch (e) {
    console.error("Error updating profile", e);
    const res = new NextResponse(
      JSON.stringify({
        message: "Error updating profile",
      })
    );
  }
}
