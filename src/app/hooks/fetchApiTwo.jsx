import axios from "axios";
import Cookies from "js-cookie";

const apikay = Cookies.get("jwt");
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL_API;

export const fetchApiTwo = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${apikay}` }, // إضافة الـ Authorization كجزء من headers
});
