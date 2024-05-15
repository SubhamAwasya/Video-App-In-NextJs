import { connectDB } from "@/server/utils/db";
import { NextResponse } from "next/server";

//my
import Comment from "@/server/models/Comment";

console.log("SignUp========================================================");

connectDB();

export async function POST(request) {
  const req = await request.json();
  try {
    console.log(req);
    // Saving comment to database
    await Comment.create(req);
    // Sending response
    return new NextResponse(
      JSON.stringify({
        message: "Comment added successfully",
      })
    );
  } catch (error) {
    console.error("Error adding document: ", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while adding comment",
      })
    );
  }
}
