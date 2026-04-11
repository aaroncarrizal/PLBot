import OpenF1API from "./api";
import { Session } from "./interfaces/Session";

export const getLatestSession = async (): Promise<Session> => {
  const res = await OpenF1API.get<Session[]>('/sessions', {
    params: {
      session_key: 'latest'
    }
  });
  return res.data[0];
}