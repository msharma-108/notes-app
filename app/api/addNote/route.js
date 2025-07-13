import { NextResponse } from "next/server";
import {connectDB} from "@/utils/mongo"
import users from "@/models/userModel"
export async function POST(request){
    await connectDB()
    const req=await request.json()
    const {noteId,_id,title,description}=req
    try{
        console.log(noteId,_id,title,description)
        if(noteId){
            await users.findOneAndUpdate({_id:_id,"notes._id":noteId},{$set:{ 'notes.$.title': title, 'notes.$.description': description }}) //'tasks.$.title' uses the positional operator $ to refer to the matched array element.
        }
        else{
            await users.findByIdAndUpdate(_id,{$push:{notes:{title,description}}})
        }
        return NextResponse.json({success:true})
    }catch(err){
        console.log(err)
        return NextResponse.json({success:false})
    }
}