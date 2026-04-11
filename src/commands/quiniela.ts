import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getCurrentDriverStandings } from '../api/OpenF1/getCurrentDriverStandings';
import { formatDriverStandings } from '../utils/OpenF1/formatDriverStandings';
import { getQuinielaByUserId } from '../utils/OpenF1/quinielaByUserId';
import User from '../models/user';
import { renderQuinielaTable } from '../utils/OpenF1/renderQuinielaTable';

export default {
  data: new SlashCommandBuilder()
    .setName('quiniela')
    .setDescription('Gets the status of the F1 quiniela')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get the quiniela for')
        .setRequired(false)),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const targetUser = interaction.options.getUser('user');
      const driverStandings = await getCurrentDriverStandings();
      const formattedDriverStandings = await formatDriverStandings(driverStandings, driverStandings[0].session_key);

      if (targetUser) {
        const quiniela = await getQuinielaByUserId(formattedDriverStandings, targetUser.id);
        const totalPoints = quiniela.reduce((acc, driver) => acc + driver.points, 0);
        const table = renderQuinielaTable(quiniela);

        const embed = new EmbedBuilder()
          .setTitle(`${targetUser.username}'s quiniela - ${totalPoints} points`)
          .setDescription(table)
          .setThumbnail(targetUser.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });
      } else {
        const allUsers = await User.find({});

        const leaderboardData = allUsers.map(dbUser => {
          const quiniela = formattedDriverStandings.filter(driver => dbUser.drivers.includes(driver.driverNumber));
          const totalPoints = quiniela.reduce((acc, driver) => acc + driver.points, 0);
          return { dbUser, quiniela, totalPoints };
        });

        // Sort descending by points
        leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);

        const embeds = await Promise.all(leaderboardData.map(async (data) => {
          const table = renderQuinielaTable(data.quiniela);
          const embed = new EmbedBuilder()
            .setTitle(`${data.dbUser.username}'s quiniela - ${data.totalPoints} points`)
            .setDescription(table);

          try {
            const discordUser = await interaction.client.users.fetch(data.dbUser.discordId);
            embed.setThumbnail(discordUser.displayAvatarURL());
          } catch (e) {
            // Fallback if user not accessible
          }

          return embed;
        }));

        await interaction.reply({ embeds: embeds.slice(0, 10) });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply('Your quiniela is fucked up my boy.');
    }
  },
};
