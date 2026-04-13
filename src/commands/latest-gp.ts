import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getMeeting } from '../api/OpenF1/getMeeting';
import { buildGPInfoEmbed } from '../utils/OpenF1/buildGPInfoEmbed';

export default {
  data: new SlashCommandBuilder()
    .setName('latest-gp')
    .setDescription('Replies with the latest F1 Grand Prix'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const latestMeeting = await getMeeting('latest');
      const embed = await buildGPInfoEmbed(latestMeeting);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        'There was an error getting the next Grand Prix.',
      );
    }
  },
};
