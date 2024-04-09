import User from "@/server/models/User";
import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
//my

console.log(
  "Get User By Id========================================================"
);

connectDB();

export async function GET(request, { params }) {
  try {
    // Find user in database

    const user = await User.findById(params.id).select(
      "-password  -refreshToken"
    );

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "User Received",
        data: user,
      })
    );

    return res;
  } catch (e) {
    console.error("Error in receiving user by id ", e);
    const res = new NextResponse(
      JSON.stringify({
        message: "User Not Found",
      })
    );
  }
}
