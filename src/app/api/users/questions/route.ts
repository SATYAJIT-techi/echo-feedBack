import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userQuestion } = reqBody;
    const userId = getDataFromToken(request); //to verify token
    const data = await User.findOne({ _id: userId }).select("-password");
    if (!data) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
    data.question = userQuestion;
    await data.save();

    return NextResponse.json({
      data: process.env.DOMAIN + "/profile/" + data.username,
      status: 200,
      success: true,
      message: "Question published successfully",
    });
  } catch (error: any) {
    // console.log("Error", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
