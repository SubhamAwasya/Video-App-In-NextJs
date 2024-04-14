import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";
import Video from "@/server/models/Video";
import jwt from "jsonwebtoken";

//my
console.log(
  "Like Video========================================================"
);

connectDB();

export async function PUT(request) {
  try {
    const token = request.cookies.get("accessToken")?.value;
    const req = await request.json();

    const videoId = req.videoId;

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

    // Find video in database
    const video = await Video.findById(videoId);
    if (!video) {
      return new NextResponse(
        JSON.stringify({
          message: "Video not found!",
        })
      );
    }

    // Check if user has already liked the video
    if (video.likes.includes(decodedToken.id)) {
      video.likes.splice(video.likes.indexOf(decodedToken.id), 1);
      const updatedVideo = await video.save({ new: true });
      // Sending response
      return new NextResponse(
        JSON.stringify({
          message: "Like removed successfully!",
          data: JSON.stringify(updatedVideo),
        })
      );
    }

    // Add user to video likes array
    video.likes.push(decodedToken.id);

    //  Remove user from video dislikes array
    if (video.dislikes.includes(decodedToken.id)) {
      video.dislikes.splice(video.dislikes.indexOf(decodedToken.id), 1);
    }

    // Save video to database
    const updatedVideo = await video.save({ new: true });

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "Like added successfully!",
        data: JSON.stringify(updatedVideo),
      })
    );

    return res;
  } catch (e) {
    console.error("Error adding like: ", e);
    const res = new NextResponse(
      JSON.stringify({
        message: "Error adding like: ",
      })
    );
  }
}
