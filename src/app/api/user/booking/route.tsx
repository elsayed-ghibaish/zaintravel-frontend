import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const {
      name,
      region,
      movepoint,
      phone,
      email,
      date,
      timing,
      triptype,
      exittiming,
      paymenttype,
      price,
      valded,
      users_permissions_users,
    } = await req.json();

    // استخدام axios لإرسال الطلب لتسجيل المستخدم في Strapi
    const STRAPI_URL = process.env.STRAPI_URL;
    await axios.post(`${STRAPI_URL}/api/bookings`, {
      data: {
        name,
        region,
        movepoint,
        phone,
        email,
        date,
        timing,
        triptype,
        exittiming,
        paymenttype,
        price,
        valded,
        users_permissions_users,
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
