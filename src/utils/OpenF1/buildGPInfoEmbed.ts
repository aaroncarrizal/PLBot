import { EmbedBuilder } from 'discord.js';
import { Meeting } from '../../api/OpenF1/interfaces/Meeting';
import { getSessionsByMeetingKey } from '../../api/OpenF1/getSessions';
export const buildGPInfoEmbed = async (
  meeting: Meeting,
): Promise<EmbedBuilder> => {
  const sessions = await getSessionsByMeetingKey(meeting.meeting_key);
  const embed = new EmbedBuilder()
    .setTitle(meeting.meeting_official_name)
    .addFields(
      { name: 'Circuit', value: meeting.circuit_short_name },
      { name: 'Location', value: meeting.location },
      { name: 'Country', value: meeting.country_name },
    )
    .setThumbnail(meeting.country_flag);
  for (const session of sessions) {
    embed.addFields({
      name: session.session_name,
      value: `<t:${Math.floor(Date.parse(session.date_start) / 1000)}:F>`,
      inline: true,
    });
  }

  return embed;
};
