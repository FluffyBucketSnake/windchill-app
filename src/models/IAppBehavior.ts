import { Unit } from "./Unit";

export type CalculationResults = number | Error | null;

export interface IAppBehavior {
  setActualTemperature(text: string): void;
  setWindSpeed(text: string): void;
  tryCalculatingResults(
    actualTemperature: string,
    windSpeed: string,
    actualTemperatureUnit: Unit,
    windSpeedUnit: Unit
  ): void;
  changeUnits(temperatureUnit: Unit, speedUnit: Unit): void;

  get showCalculateButton(): boolean;
}
