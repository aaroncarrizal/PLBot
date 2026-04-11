import OpenF1API from "./api";
import { Meeting } from "./interfaces/Meeting";

export const getLatestMeeting = async (): Promise<Meeting> => {
  const res = await OpenF1API.get<Meeting[]>('/meetings?meeting_key=latest');
  return res.data[0];
}