import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";

//my
import Comment from "@/server/models/Comment";

console.log(
  "Get comments========================================================"
);

connectDB();

export async function GET(request, { params }) {
  try {
    //get comments based on video id
    const comments = await Comment.find({ videoId: params.id });
    console.log("comments");
    console.log(comments);
    // Sending response
    return new NextResponse(
      JSON.stringify({
        message: "Comments",
        data: comments,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while getting comment",
      })
    );
  }
}
