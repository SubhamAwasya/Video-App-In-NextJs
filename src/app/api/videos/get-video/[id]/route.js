import Video from "@/server/models/Video";
import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";

//my

console.log(
  "Get Video By Id========================================================"
);

connectDB();

export async function GET(request, { params }) {
  try {
    // Find user in database
    const video = await Video.findById(params.id);

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "Video Received",
        data: video,
      })
    );

    return res;
  } catch (e) {
    console.error("Error in Receiving video by id ", e);
  }
}
