import { NextResponse } from "next/server";
import users from "@/models/userModel";
export async function POST(request){
    const req=await request.json()
    const {userId,taskId,isCompleted}=req
    try {
        console.log(userId,taskId,isCompleted)
        const newStatus=!isCompleted
        await users.findOneAndUpdate(
            { _id: userId, 'tasks._id': taskId },
            { $set: { 'tasks.$.completed': newStatus } }  
          )
         return NextResponse.json({success:true}) 
    }
    catch (error) {
        return NextResponse.json({success:false}) 

    }
}