import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const {
      username,
      lastName,
      email,
      PrimaryPhone,
      password,
      confirmed,
      PrimaryAddress,
      SecondaryPhone,
      Region,
      MovePoint,
      University,
      college,
      classroom,
      SecondaryAddress,
    } = await req.json();

    // استخدام axios لإرسال الطلب لتسجيل المستخدم في Strapi
    const STRAPI_URL = process.env.STRAPI_URL;
    await axios.post(`${STRAPI_URL}/api/auth/local/register`, {
      username: username,
      lastname: lastName,
      email,
      primaryphone: PrimaryPhone,
      password,
      confirmed,
      primaryaddress: PrimaryAddress,
      secondaryphone: SecondaryPhone,
      region: Region,
      movepoint: MovePoint,
      university: University,
      college,
      classroom,
      secondaryaddress: SecondaryAddress,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
