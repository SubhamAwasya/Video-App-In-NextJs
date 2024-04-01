import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";

//my
import { fireStoreDB } from "@/helper/serverFirebase";

console.log("Get User========================================================");

export async function GET(request, { params }) {
  try {
    console.log(params.id);
    // Find user in database
    const docRef = doc(fireStoreDB, "users", params?.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json("User Not Found", { status: 401 });
    }

    // Sending response
    const res = new NextResponse(
      JSON.stringify({
        message: "User Received",
        data: docSnap.data(),
      })
    );

    return res;
  } catch (e) {
    console.error("Error in Logout ", e);
  }
}
