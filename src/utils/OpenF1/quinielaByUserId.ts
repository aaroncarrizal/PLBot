import { FormattedDriverStanding } from "../../api/OpenF1/interfaces/FormattedDriverStanding";
import User from "../../models/user";

export const getQuinielaByUserId = async (driverStandings: FormattedDriverStanding[], userId: string) => {
  const user = await User.findOne({ discordId: userId });
  if (!user) {
    throw new Error("User not found");
  }
  const formatedQuiniela: FormattedDriverStanding[] = [];
  driverStandings.filter((driver) => {
    if (user.drivers.includes(driver.driverNumber)) {
      formatedQuiniela.push(driver);
    }
  })
  return formatedQuiniela;
}