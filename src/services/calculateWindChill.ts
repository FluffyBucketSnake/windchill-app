import { convertUnit, Unit } from "../models/Unit";

export function calculateWindChill(
  actualTemperature: number,
  windSpeed: number,
  temperatureUnit: Unit,
  speedUnit: Unit
): number {
  const Ta = convertUnit(actualTemperature, temperatureUnit.id, "celsius");
  const v = convertUnit(windSpeed, speedUnit.id, "kph");
  const vP6 = Math.pow(v, 0.16);
  const Tp = 13.12 + 0.6215 * Ta - 11.37 * vP6 + 0.3965 * Ta * vP6;
  if (Tp > Ta) {
    throw new Error(
      "The resulting perceived temperature is higher than the actual temperature."
    );
  }
  return Tp;
}
