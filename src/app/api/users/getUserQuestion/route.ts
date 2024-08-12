import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import next from "next";
import Response from "@/models/responseModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const question = await Response.findOne({ _id: id });
    console.log("question", question);
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Question Fetched", success: true, res: question },
      { status: 200 }
    );
  } catch (error: any) {
    // console.log("Error", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
