import { NextResponse } from "next/server"
import users from "@/models/userModel"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
export async function POST(request){

    const req=await request.json()
    const{email,password}=req
    if(!email || !password) return NextResponse.json({success:false,message:"Email and password are required"})
    try{
        const user= await users.findOne({email})  
        if(!user) return NextResponse.json({success:false,message:"User not found"})
        const passmatch=await bcrypt.compare(password,user.password)
        if(!passmatch) return NextResponse.json({success:false,message:"Incorrect password"})
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        const cookieStore=await cookies()
        cookieStore.set("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite: process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:24*60*60*1000
        })  
        return NextResponse.json({success:true})
    }catch(e){
        return NextResponse.json({success:false,message:e.message})
    }
}