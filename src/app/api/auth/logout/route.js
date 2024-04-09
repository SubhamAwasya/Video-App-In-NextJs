import { NextResponse } from "next/server";
console.log("LogOut========================================================");

export async function GET() {
  try {
    const res = new NextResponse(
      JSON.stringify({
        message: "Log Out successful",
      })
    );
    // Setting Cookies
    res.cookies.delete("accessToken");

    return res;
  } catch (e) {
    console.error("Error in Logout ", e);
  }
}
