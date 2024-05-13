import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const {
      name,
      region,
      movepoint,
      phone,
      date,
      email,
      timing,
      typeofbag,
      paymenttype,
      price,
      universityhousing,
      user,
    } = await req.json();

    // استخدام axios لإرسال الطلب لتسجيل المستخدم في Strapi
    const STRAPI_URL = process.env.STRAPI_URL;
    await axios.post(`${STRAPI_URL}/api/bookingbags`, {
      data: {
        name,
        region,
        movepoint,
        phone,
        email,
        date,
        timing,
        typeofbag,
        paymenttype,
        price,
        universityhousing,
        user,
      },
    });

    return NextResponse.json(
      { message: "bookings registered." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the bookings." },
      { status: 500 }
    );
  }
}
