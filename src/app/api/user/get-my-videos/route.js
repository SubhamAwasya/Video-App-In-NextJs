import Video from "@/server/models/Video";
import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

console.log(
  "My Videos========================================================"
);

connectDB();

export async function GET(request) {
  try {
    const token = request.cookies.get("accessToken")?.value;
    console.log("=> / GET / token:", token);
    if (!token) {
      return NextResponse.json("Unauthorized", {
        status: 401,
      });
    }
    // Decode Access Token
    let decodedToken;
    try {
      decodedToken = await jwt.decode(token);
    } catch (error) {
      console.log(error);
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    // Find my videos
    const video = await Video.find({ userId: { $eq: decodedToken.id } });

    return new NextResponse(JSON.stringify(video));
  } catch (error) {
    console.error("Error My videos:", error);
    return new NextResponse(JSON.stringify({ message: error }));
  }
}
