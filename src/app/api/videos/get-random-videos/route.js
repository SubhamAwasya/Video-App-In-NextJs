import Video from "@/server/models/Video";
import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";

console.log(
  "Random Video========================================================"
);

connectDB();

export async function GET(req) {
  try {
    const video = await Video.find({});
    return new NextResponse(JSON.stringify(video));
  } catch (error) {
    console.error("Error fetching random documents:", error);
    return new NextResponse(JSON.stringify({ message: error }));
  }
}
