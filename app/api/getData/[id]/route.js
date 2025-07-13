import { NextResponse } from 'next/server';
import users from "@/models/userModel"
export async function GET(req, { params }) {
    const parameters= await params
  const userId =  parameters.id;
  const userData= await users.findById(userId)  
  return NextResponse.json(userData);
}