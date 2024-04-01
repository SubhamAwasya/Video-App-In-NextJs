import { fireStoreDB } from "@/helper/serverFirebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

console.log(
  "Random Video========================================================"
);

export async function GET(req) {
  try {
    const querySnapshot = await getDocs(collection(fireStoreDB, "videos"));
    const videos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      videos.push({ id: doc.id, data: doc.data() });
    });
    return new NextResponse(JSON.stringify(videos));
  } catch (error) {
    console.error("Error fetching random documents:", error);
    return new NextResponse(JSON.stringify({ message: error }));
  }
}
