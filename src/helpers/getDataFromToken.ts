import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      return null;
    }
    const userId = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
    return userId.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
