import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email } = requestBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    await sendMail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
