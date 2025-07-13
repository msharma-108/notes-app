import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(){
    const cookieStore=await cookies()
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ loggedIn: false ,message:"no token" });
  
    try {
      const id = jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.json({ loggedIn: true ,id});
    } catch(err) {
      console.log(err)
      return NextResponse.json({ loggedIn: false });
    }
}