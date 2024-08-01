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
    data.question = userQuestion;
    await data.save();

    return NextResponse.json({
      data: process.env.DOMAIN + "/profile/" + data.username,
      status: 200,
    });
  } catch (error: any) {
    // console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
