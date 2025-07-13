import { NextResponse } from "next/server";
import users from "@/models/userModel"
import bcrypt from "bcryptjs"
import {connectDB} from "@/utils/mongo"
export async function POST(req){
    await connectDB()
    const request=await req.json()
    const {username,email,password}=request
    console.log("here")
    if(!username || !password || !email) return NextResponse.json({success:false,message:"Missing details"})
    try{
        const existinguser=await users.findOne({email})
        if(existinguser) return NextResponse.json({success:false , message:"This user already exists"})
        const hashedpassword=await bcrypt.hash(password,10)
        const user=new users({username,email,password:hashedpassword})
        await user.save()       
        return NextResponse.json({success:true})
    }catch(e){
        return NextResponse.json({success:false,message:e.message})
    }

}