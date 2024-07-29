import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, user } = reqBody;

    // check if user already exists
    const userFound = await User.findOne({ _id: user._id });
    if (userFound) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      userFound.password = hashedPassword;

      const savedUser = await userFound.save();
      return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser,
      });
    }

    // hashing password

    // send verification email

    // this is the response that will be sent to the client
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
