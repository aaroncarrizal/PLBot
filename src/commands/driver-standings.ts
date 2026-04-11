import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getCurrentDriverStandings } from '../api/OpenF1/getCurrentDriverStandings';
import { formatDriverStandings } from '../utils/OpenF1/formatDriverStandings';

export default {
  data: new SlashCommandBuilder()
    .setName('driver-standings')
    .setDescription('Replies with the current driver standings'),
  async execute(interaction: ChatInputCommandInteraction) {

    try {
      const driverStandings = await getCurrentDriverStandings();
      const formattedDriverStandings = await formatDriverStandings(driverStandings, driverStandings[0].session_key);

      const embeds: EmbedBuilder[] = [];

      // 1. Create Podium Embeds (P1, P2, P3)
      const podium = formattedDriverStandings.slice(0, 3);
      for (const driver of podium) {
        const podiumEmbed = new EmbedBuilder()
          .setTitle(`${driver.position === 1 ? '🥇' : driver.position === 2 ? '🥈' : '🥉'} ${driver.acronym}`)
          .setDescription(`**Team**: ${driver.team}\n**Points**: ${driver.points}`)
          .setThumbnail(driver.headshot);

        if (driver.teamColor) {
          podiumEmbed.setColor(`#${driver.teamColor}` as any);
        }
        embeds.push(podiumEmbed);
      }

      // 2. Create Main Standings List Embed
      const mainEmbed = new EmbedBuilder()
        .setTitle('Full Driver Standings')
        .setColor(0x2F3136); // Neutral dark color for the list

      for (const driver of formattedDriverStandings) {
        mainEmbed.addFields({
          name: `${driver.position}. ${driver.name} (${driver.acronym})`,
          value: `Points: ${driver.points} | ${driver.team}`,
          inline: true
        });
      }


      embeds.push(mainEmbed);
      // const footerEmbed = new EmbedBuilder().setDescription(`[View Full Standings](https://openf1.org/championships/f1/2026/drivers)`);
      // embeds.push(footerEmbed)

      await interaction.reply({ embeds: embeds });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error getting the driver standings.');
    }
  },
};

