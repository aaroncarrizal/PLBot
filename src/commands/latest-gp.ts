import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getLatestMeeting } from '../api/OpenF1/getLatestMeeting';

export default {
  data: new SlashCommandBuilder()
    .setName('latest-gp')
    .setDescription('Replies with the latest F1 Grand Prix'),
  async execute(interaction: ChatInputCommandInteraction) {

    try {
      const latestMeeting = await getLatestMeeting();
      await interaction.reply(`The latest F1 Grand Prix was the ${latestMeeting.meeting_name}`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error getting the latest meeting.');
    }
  },
};

