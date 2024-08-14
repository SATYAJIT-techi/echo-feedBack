import User from "@/models/userModel";
import QuestionModel from "@/models/responseModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userQuestion } = reqBody;
    const userId = getDataFromToken(request); //to verify token
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      NextResponse.json({ message: "Invalid user id" }, { status: 400 });
      throw new Error("Invalid user id");
    }
    // add new response model
    const loginUserQuestion = new QuestionModel({
      question: userQuestion,
      userAnswer: [],
      user: userId,
    });
    const temp = await loginUserQuestion.save();
    console.log("temp--", temp);
    const userFound = await User.findOneAndUpdate(
      { _id: userId },

      { $push: { userResponse: temp } },
      { new: true }
    );
    const fina = await userFound.save();
    console.log("fina--", fina);
    // const data = await User.findOne({ _id: userId }).select("-password");
    if (!userFound) {
      return NextResponse.json(
        { message: "User not found", status: 404 },
        { status: 404 }
      );
    }
    // userFound.question = userQuestion;
    await userFound.save();
    const customLink = `${process.env.DOMAIN}/profile/${userFound.username}?id=${temp._id}`;

    return NextResponse.json(
      {
        data: customLink,
        status: 200,
        success: true,
        message: "Question published successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    // console.log("Error", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
    const userFound = await QuestionModel.find({ user: userId });
    if (!userFound) {
      return NextResponse.json(
        { message: "User not found", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: userFound,
      status: 200,
      success: true,
      message: "User found",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
