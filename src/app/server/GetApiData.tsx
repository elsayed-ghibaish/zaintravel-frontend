import { StrapiClient } from "@/app/server/StrapiClient";

const GetStudnts = () => StrapiClient.get("/users?populate=*");
const GetRegone = () => StrapiClient.get("/regions?populate=*");
const GetMovePoints = () => StrapiClient.get("/movepoints?populate=*");
const GetUniversity = () => StrapiClient.get("/universitys?populate=*");
const GetBookings = () => StrapiClient.get("/bookings?populate=*");

export default {
  GetStudnts,
  GetRegone,
  GetMovePoints,
  GetUniversity,
  GetBookings,
};
