import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import Video from "@/server/models/Video";

//my

console.log("Add view========================================================");

connectDB();

export async function PUT(request) {
  try {
    const req = await request.json();
    const videoId = req.videoId;

    const video = await Video.findById(videoId);
    if (!video) {
      return new NextResponse(
        JSON.stringify({
          message: "Video not found!",
        })
      );
    }

    video.views += 1;
    await video.save();

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "View added successfully!",
      })
    );

    return res;
  } catch (e) {
    console.error("Error adding view: ", e);
    const res = new NextResponse(
      JSON.stringify({
        message: "Error adding view: ",
      })
    );
  }
}
