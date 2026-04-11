import OpenF1API from "./api";
import { getLatestSession } from "./getLatestSession";
import { DriverStanding } from "./interfaces/DriverStanding";
import { OpenF1CacheService } from "../../services/cacheService";

const MAX_ATTEMPTS = 10;
const TIME_BETWEEN_ATTEMPTS = 1000 / 6;

const updateCacheIfValid = async (data: any[]) => {
  if (data && data.length > 0) {
    const first = data[0] as DriverStanding;
    if (first.meeting_key && first.session_key) {
      await OpenF1CacheService.updateCachedKeys(first.meeting_key, first.session_key);
    }
  }
};

export const getCurrentDriverStandings = async (): Promise<DriverStanding[]> => {
  // 1. Try fetching 'latest'
  try {
    const res = await OpenF1API.get<DriverStanding[] | { detail: string }>(
      '/championship_drivers?session_key=latest',
      { validateStatus: (status) => status === 200 || status === 404 }
    );

    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      await updateCacheIfValid(res.data);
      return res.data;
    }
  } catch (error) {
    console.warn("Initial 'latest' fetch failed, checking cache...");
  }

  // 2. Try fetching from Cache
  try {
    const cached = await OpenF1CacheService.getCachedKeys();
    if (cached) {
      console.log(`Trying cached session_key: ${cached.session_key}`);
      const res = await OpenF1API.get<DriverStanding[] | { detail: string }>(
        `/championship_drivers?session_key=${cached.session_key}`,
        { validateStatus: (status) => status === 200 || status === 404 }
      );

      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
    }
  } catch (error) {
    console.warn("Cache fetch failed, trying full fallback...");
  }

  // 3. Full Fallback: Search backwards from latest session
  try {
    const latestSession = await getLatestSession();
    let latestKey = latestSession.session_key;

    for (let i = 0; i < MAX_ATTEMPTS && latestKey > 0; i++) {
      console.log(`trying to fetch with ${latestKey}`);

      const response = await OpenF1API.get<DriverStanding[] | { detail: string }>(
        `/championship_drivers?session_key=${latestKey}`,
        { validateStatus: (status) => status === 200 || status === 404 }
      );

      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        await updateCacheIfValid(response.data);
        return response.data;
      }

      // Decrement and wait before next attempt to avoid 429 Too Many Requests
      latestKey--;
      if (i < MAX_ATTEMPTS - 1) {
        await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_ATTEMPTS));
      }
    }
  } catch (error) {
    console.error("Error during fallback search:", error);
  }

  return [];
}