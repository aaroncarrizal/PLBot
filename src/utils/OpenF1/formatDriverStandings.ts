import { getDriversInfo } from "../../api/OpenF1/getDriversInfo";
import { DriverStanding } from "../../api/OpenF1/interfaces/DriverStanding";

export const formatDriverStandings = async (driverStandings: DriverStanding[], sessionKey?: number) => {
  if (!sessionKey) {
    sessionKey = driverStandings[0].session_key;
  }
  const driversInfo = await getDriversInfo(sessionKey);
  // sort both by driver number
  driversInfo.sort((a, b) => a.driver_number - b.driver_number);
  driverStandings.sort((a, b) => a.driver_number - b.driver_number);

  const formated = []
  for (let i = 0; i < driverStandings.length; i++) {
    formated.push({
      name: driversInfo[i].first_name + " " + driversInfo[i].last_name,
      driverNumber: driversInfo[i].driver_number,
      team: driversInfo[i].team_name,
      points: driverStandings[i].points_current,
      position: driverStandings[i].position_current,
      acronym: driversInfo[i].first_name.toUpperCase().charAt(0) + driversInfo[i].last_name.toUpperCase().charAt(0) + driversInfo[i].driver_number.toString(),
      headshot: driversInfo[i].headshot_url,
      teamColor: driversInfo[i].team_colour,
    })
  }

  // sort formated by position
  formated.sort((a, b) => a.position - b.position);
  return formated
}