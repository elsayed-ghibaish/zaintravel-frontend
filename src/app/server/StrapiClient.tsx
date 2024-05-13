import axios from "axios";

const apikay = process.env.NEXT_PUBLIC_REST_API_KEY; // تصحيح اسم المتغير
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL_API;

export const StrapiClient = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${apikay}` }, // إضافة الـ Authorization كجزء من headers
});
