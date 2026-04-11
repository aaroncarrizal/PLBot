import OpenF1API from "./api";
import { Driver } from "./interfaces/Driver";

export const getDriversInfo = async (session_key: number): Promise<Driver[]> => {
  const res = await OpenF1API.get<Driver[]>(`/drivers?`, {
    params: {
      session_key: session_key
    }
  });
  return res.data;
}