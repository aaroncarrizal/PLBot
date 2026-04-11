import { FormattedDriverStanding } from "../../api/OpenF1/interfaces/FormattedDriverStanding";

export const renderQuinielaTable = (quiniela: FormattedDriverStanding[]) => {
  const maxNameLen = Math.max(...quiniela.map(d => d.name.length), 6);
  const header = `Pos | ${'Driver'.padEnd(maxNameLen, ' ')} | Pts`;
  const divider = `${'-'.repeat(4)}|${'-'.repeat(maxNameLen + 2)}|${'-'.repeat(4)}`;

  const rows = quiniela.map(driver => {
    const pos = driver.position.toString().padStart(3, ' ');
    const name = driver.name.padEnd(maxNameLen, ' ');
    const pts = driver.points.toString().padStart(3, ' ');
    return `${pos} | ${name} | ${pts}`;
  }).join('\n');

  return `\`\`\`\n${header}\n${divider}\n${rows}\n\`\`\``;
};
