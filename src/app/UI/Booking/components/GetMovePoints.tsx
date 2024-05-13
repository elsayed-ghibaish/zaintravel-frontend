import React, { useEffect, useState } from "react";
import useFetch from "@/app/hooks/useFetch";

export default function GetMovePoints() {
  const { data, loading, error }: any = useFetch("/movepoints");
  const [GetMovePointsData, setGetMovePointsData]: any = useState([]);
  useEffect(() => {
    setGetMovePointsData(data);
  }, [data, GetMovePointsData]);
  return { GetMovePointsData };
}
