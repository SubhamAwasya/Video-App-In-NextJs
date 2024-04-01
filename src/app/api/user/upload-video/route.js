import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";
//my
import { fireStoreDB } from "@/helper/serverFirebase";

console.log(
  "Upload Video========================================================"
);

export async function POST(req) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json("You Don't Have access token", {
        status: 401,
      });
    }

    const videoData = await req.json();
    // Decode Access Token
    let decodedToken;
    console.log(decodedToken);
    try {
      decodedToken = await jwt.decode(token);
    } catch (error) {
      console.log(error);
      return NextResponse.json("Invalid Token", { status: 401 });
    }

    const test = {
      userID: decodedToken?.id,
      title: videoData.title,
      description: videoData.description,
      tags: videoData.tags,
      videoURL: videoData.videoURL,
      thumbnailURL: videoData.thumbnailURL,
    };
    console.log(test);
    // Storing data in fireStore DB
    const docRef = await addDoc(collection(fireStoreDB, "videos"), test);

    // Is data stored successfully
    if (!docRef.id) {
      return new NextResponse(
        JSON.stringify({
          message: "Failed to store data in firebase",
        })
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Video Upload Successful" })
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Test" }));
  }
}
