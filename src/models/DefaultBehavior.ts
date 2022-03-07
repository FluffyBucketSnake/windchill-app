import { calculateWindChill } from "../services/calculateWindChill";
import { parseNonNegative, parseNumber } from "../utils/parsing";
import { CalculationResults, IAppBehavior } from "./IAppBehavior";
import { Unit } from "./Unit";

export class DefaultBehavior implements IAppBehavior {
  constructor(
    setActualTemperature: (value: string) => void,
    setWindSpeed: (value: string) => void,
    setResults: (results: CalculationResults) => void,
    resetInputOnCalculate: boolean = false
  ) {
    this._setActualTemperatureState = setActualTemperature;
    this._setWindSpeedState = setWindSpeed;
    this._setResults = setResults;
    this._resetInputOnCalculate = resetInputOnCalculate;
  }

  changeUnits(): void {
    this._setResults(null);
  }
  setActualTemperature(text: string): void {
    this._setActualTemperatureState(text);
  }
  setWindSpeed(text: string): void {
    this._setWindSpeedState(text);
  }
  tryCalculatingResults(
    actualTemperature: string,
    windSpeed: string,
    temperatureUnit: Unit,
    speedUnit: Unit
  ): void {
    let results: CalculationResults;
    try {
      results = this._calculateResults(
        actualTemperature,
        windSpeed,
        temperatureUnit,
        speedUnit
      );
    } catch (err) {
      results = err as Error;
    }
    this._setResults(results);
    if (this._resetInputOnCalculate) {
      this._setActualTemperatureState("");
      this._setWindSpeedState("");
    }
  }

  private _calculateResults(
    actualTemperature: string,
    windSpeed: string,
    temperatureUnit: Unit,
    speedUnit: Unit
  ): number {
    const Ta = parseNumber(actualTemperature, "actual temperature");
    const v = parseNonNegative(windSpeed, "wind speed");
    return calculateWindChill(Ta, v, temperatureUnit, speedUnit);
  }

  get showCalculateButton(): boolean {
    return true;
  }

  private _setActualTemperatureState: (value: string) => void;
  private _setWindSpeedState: (value: string) => void;
  private _setResults: (results: CalculationResults) => void;
  private _resetInputOnCalculate: boolean;
}
