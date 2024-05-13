import axios from "axios";
import Cookies from "js-cookie";

const apikay = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL_API;

export const fetchApi = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${apikay}` }, // إضافة الـ Authorization كجزء من headers
});
