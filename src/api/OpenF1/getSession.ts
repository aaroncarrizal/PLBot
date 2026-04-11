import OpenF1API from "./api";
import { Session } from "./interfaces/Session";

export const getSession = async (sessionKey: number | 'latest'): Promise<Session> => {
  const res = await OpenF1API.get<Session[]>('/sessions', {
    params: {
      session_key: sessionKey
    }
  });
  return res.data[0];
}