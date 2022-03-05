export type Unit = {
  id: UnitId;
  friendlyName: string;
  suffix: string;
};

export type UnitId = "celsius" | "fahrenheit" | "kph" | "mph";

export const temperatureUnits: Unit[] = [
  {
    id: "celsius",
    friendlyName: "Celsius",
    suffix: "ºC",
  },
  {
    id: "fahrenheit",
    friendlyName: "Fahrenheit",
    suffix: "ºF",
  },
];

export const speedUnits: Unit[] = [
  {
    id: "kph",
    friendlyName: "Metric",
    suffix: "km/h",
  },
  {
    id: "mph",
    friendlyName: "Imperial",
    suffix: "mph",
  },
];

export function convertUnit(
  value: number,
  initialUnit: UnitId,
  finalUnit: UnitId
): number {
  if (initialUnit === finalUnit) {
    return value;
  }
  if (initialUnit === "mph" && finalUnit === "kph") {
    return 1.609344 * value;
  }
  if (initialUnit === "fahrenheit" && finalUnit === "celsius") {
    return (value - 32) / 1.8;
  }
  throw new Error(
    `Conversion from '${initialUnit}' to '${finalUnit}' not implemented/possible.`
  );
}
