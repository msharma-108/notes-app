import users from "@/models/userModel"
import { NextResponse } from "next/server"

export async function POST(request){
    const req=await request.json()
    const {fieldId,userId,field}=req
    try{
        if(field=="notes")   await users.findByIdAndUpdate(userId,{$pull:{notes:{_id:fieldId}}})
        else if(field=="tasks") await users.findByIdAndUpdate(userId,{$pull:{tasks:{_id:fieldId}}})
        return NextResponse.json({success:true})
    }catch(err){
        return NextResponse.json({success:false})

    }

}