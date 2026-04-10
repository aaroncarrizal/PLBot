import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { format } from 'date-fns';
import User from '../models/user';
import UserService from '../services/userService';
import { UserDTO } from '../dto/userDto';
import { getLatestMeeting } from '../api/getLatestMeeting';

export default {
  data: new SlashCommandBuilder()
    .setName('latest-meeting')
    .setDescription('Replies with the latest F1 Grand Prix'),
  async execute(interaction: ChatInputCommandInteraction) {

    try {
      const latestMeeting = await getLatestMeeting();
      await interaction.reply(`The latest F1 Grand Prix was the ${latestMeeting.meeting_name}, raced from ${format(new Date(latestMeeting.date_start), 'MMMM dd, yyyy')} to ${format(new Date(latestMeeting.date_end), 'MMMM dd, yyyy')}`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error getting the latest meeting.');
    }
  },
};

