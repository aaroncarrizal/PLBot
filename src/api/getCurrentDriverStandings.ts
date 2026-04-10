import axios from "axios";

export interface DriverStanding {
  meeting_key: number
  session_key: number
  driver_number: number
  position_start: number
  position_current: number
  points_start: number
  points_current: number
}
export const getCurrentDriverStandings = async () => {
  const res = await axios.get<DriverStanding[]>('https://api.openf1.org/v1/driver_standings?meeting_key=latest');
  return res.data;
}