import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getMeeting } from '../api/OpenF1/getMeeting';
import { getSessionsByMeetingKey } from '../api/OpenF1/getSessions';

export default {
  data: new SlashCommandBuilder()
    .setName('latest-gp')
    .setDescription('Replies with the latest F1 Grand Prix'),
  async execute(interaction: ChatInputCommandInteraction) {

    try {
      const latestMeeting = await getMeeting('latest');
      const sessions = await getSessionsByMeetingKey(latestMeeting.meeting_key);
      const embed = new EmbedBuilder()
        .setTitle(latestMeeting.meeting_official_name)
        .addFields(
          { name: 'Circuit', value: latestMeeting.circuit_short_name },
          { name: 'Location', value: latestMeeting.location },
          { name: 'Country', value: latestMeeting.country_name },
        )
        .setThumbnail(latestMeeting.circuit_image)
      for (const session of sessions) {
        embed.addFields({ name: session.session_name, value: `<t:${Math.floor(Date.parse(session.date_start) / 1000)}:F>`, inline: true });
      }
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error getting the latest Grand Prix.');
    }
  },
};

