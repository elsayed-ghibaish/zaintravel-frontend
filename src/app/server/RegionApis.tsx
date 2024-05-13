import { StrapiClient } from "@/app/server/StrapiClient";

const GetRegone = () => StrapiClient.get("/regions?populate=*");
const GetUniversity = () => StrapiClient.get("/universitys?populate=*");
const GetStudnts = () => StrapiClient.get("/users/1?populate=*");

export default {
  GetRegone,
  GetUniversity,
  GetStudnts,
};
