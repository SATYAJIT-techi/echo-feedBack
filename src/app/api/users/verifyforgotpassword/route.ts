import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
connect();

// in this forgetpassword token should verify user then allw to reset password
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    // this is to verify user from reset password page send via email
    const { token } = requestBody;
    console.log("Token", token);

    // this token is directly from verify mail link

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    }); //token expiry time is greater than current time

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    user.isVerified = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "User verified successfully",
      success: true,
      user: user,
      status: 200,
    });
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
