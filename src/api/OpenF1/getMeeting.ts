import OpenF1API from "./api";
import { Meeting } from "./interfaces/Meeting";

export const getMeeting = async (meetingKey: number | 'latest'): Promise<Meeting> => {
  const res = await OpenF1API.get<Meeting[]>('/meetings', {
    params: {
      meeting_key: meetingKey
    }
  });
  return res.data[0];
}