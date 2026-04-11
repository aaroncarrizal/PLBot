import OpenF1API from "./api";
import { Session } from "./interfaces/Session";

export const getSessionsByMeetingKey = async (meetingKey: number | 'latest'): Promise<Session[]> => {
  const res = await OpenF1API.get<Session[]>('/sessions', {
    params: {
      meeting_key: meetingKey
    }
  });
  return res.data;
}