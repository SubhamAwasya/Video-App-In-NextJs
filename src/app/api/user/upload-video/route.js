import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Video from "@/server/models/Video";
//my

console.log(
  "Upload Video========================================================"
);

export async function POST(req) {
  try {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json("Unauthorized", {
        status: 401,
      });
    }

    const videoData = await req.json();
    // Decode Access Token
    let decodedToken;

    try {
      decodedToken = await jwt.decode(token);
    } catch (error) {
      console.log(error);
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    const video = {
      userId: decodedToken?.id,
      title: videoData.title,
      desc: videoData.description,
      tags: videoData.tags,
      videoUrl: videoData.videoURL,
      thumbnail: videoData.thumbnailURL,
    };

    // Storing data in Mongo db
    const newVideo = await Video.create(video);

    // Is data stored successfully
    if (!newVideo) {
      return new NextResponse(
        JSON.stringify({ message: "Video Upload Failed" })
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Video Upload Successful" })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Video Upload Failed" }));
  }
}
