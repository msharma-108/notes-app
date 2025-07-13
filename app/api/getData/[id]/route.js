import { NextResponse } from 'next/server';
import users from "@/models/userModel"
import {connectDB} from "@/utils/mongo"
export async function GET(req, { params }) {
  await connectDB()
    const parameters= await params
  const userId =  parameters.id;
  const userData= await users.findById(userId)  
  return NextResponse.json(userData);
}