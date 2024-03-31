import { NextResponse } from "next/server";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";
//my
import { fireStoreDB } from "@/helper/firebase";

console.log("SignUp========================================================");

export async function POST(request) {
  const req = await request.json();
  try {
    // Find user in database
    const q = query(
      collection(fireStoreDB, "users"),
      where("email", "==", req.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.docs[0]?.data()) {
      // At least one document matches the query
      console.log("test");
      return new NextResponse(
        JSON.stringify({
          message: "User already exists! You can log in.",
        })
      );
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.password || "", salt);

    // Storing data in fireStore DB
    const docRef = await addDoc(collection(fireStoreDB, "users"), {
      name: req.name,
      email: req.email,
      password: hashedPassword,
    });

    // Is data stored successfully
    if (!docRef.id) {
      return new NextResponse(
        JSON.stringify({
          message: "Failed to store data in firebase",
        })
      );
    }
    // Sending response

    return new NextResponse(
      JSON.stringify({
        message: "SignUp successful",
      })
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
