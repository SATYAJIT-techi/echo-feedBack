import UserResponse from "@/models/responseModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();

// 1. first find the user and question
// 2. update the user response

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userAnswer, id, userId } = reqBody;
    const data = await UserResponse.findOne({ _id: id, user: userId });
    await data.updateOne({ $push: { userAnswer: userAnswer } });
    await data.save();
    console.log("data", data);
    if (!data) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Response updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
