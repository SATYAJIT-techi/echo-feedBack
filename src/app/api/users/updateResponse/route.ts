import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();

// 1. first find the user and question
// 2. update the user response

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userAnswer } = reqBody;
    const userId = getDataFromToken(request); //to verify token
    const data = await User.findOne({ _id: userId }).select("-password");
    data.userAnswer.push(userAnswer);
    await data.save();

    return NextResponse.json({
      message: "Response updated successfully",
      status: 200,
    });
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
