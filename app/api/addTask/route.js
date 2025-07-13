import users from "@/models/userModel"
import { NextResponse } from "next/server"
export async function POST(request){
    const req=await request.json()
    const {userId,newTaskTitle}=req
    try{
        await users.findByIdAndUpdate(userId,{$push:{tasks:{title:newTaskTitle}}})
        return NextResponse.json({success:true})
    }catch(error){
        return NextResponse.json({success:false})
    }
}