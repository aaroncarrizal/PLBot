import OpenF1Cache from "../models/OpenF1Cache";

export class OpenF1CacheService {
  private static CACHE_KEY = 'latest_standings';

  static async getCachedKeys() {
    try {
      return await OpenF1Cache.findOne({ key: this.CACHE_KEY });
    } catch (error) {
      console.error("Error retrieving cached keys:", error);
      return null;
    }
  }

  static async updateCachedKeys(meetingKey: number, sessionKey: number) {
    try {
      await OpenF1Cache.findOneAndUpdate(
        { key: this.CACHE_KEY },
        {
          meeting_key: meetingKey,
          session_key: sessionKey,
          last_updated: new Date()
        },
        { upsert: true, new: true }
      );
      console.log(`Updated cache: meeting_key=${meetingKey}, session_key=${sessionKey}`);
    } catch (error) {
      console.error("Error updating cached keys:", error);
    }
  }
}
