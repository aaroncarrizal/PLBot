import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getMeeting } from '../api/OpenF1/getMeeting';
import { getSessionsByMeetingKey } from '../api/OpenF1/getSessions';
import { buildGPInfoEmbed } from '../utils/OpenF1/buildGPInfoEmbed';

export default {
  data: new SlashCommandBuilder()
    .setName('next-gp')
    .setDescription('Replies with the next F1 Grand Prix'),
  async execute(interaction: ChatInputCommandInteraction) {

    try {
      const latestMeeting = await getMeeting('latest');
      const nextMeeting = await getMeeting(latestMeeting.meeting_key + 1)
      const embed = await buildGPInfoEmbed(nextMeeting)
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error getting the next Grand Prix.');
    }
  },
};

