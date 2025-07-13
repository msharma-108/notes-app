import users from "@/models/userModel"
import { NextResponse } from "next/server"
import {connectDB} from "@/utils/mongo"
export async function POST(request){
    await connectDB()
    const req=await request.json()
    const {userId,newTaskTitle}=req
    try{
        await users.findByIdAndUpdate(userId,{$push:{tasks:{title:newTaskTitle}}})
        return NextResponse.json({success:true})
    }catch(error){
        return NextResponse.json({success:false})
    }
}