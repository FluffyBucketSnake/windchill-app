import { calculateWindChill } from "../services/calculateWindChill";
import { parseNonNegative, parseNumber } from "../utils/parsing";
import { CalculationResults, IAppBehavior } from "./IAppBehavior";
import { speedUnits, temperatureUnits, Unit } from "./Unit";

export class AutomaticBehavior implements IAppBehavior {
  constructor(
    currentActualTemperature: string,
    setActualTemperature: (value: string) => void,
    currentWindSpeed: string,
    setWindSpeed: (value: string) => void,
    setResults: (results: CalculationResults) => void
  ) {
    this._temperatureUnit = temperatureUnits[0];
    this._speedUnit = speedUnits[0];
    this._setActualTemperature = setActualTemperature;
    this._setWindSpeed = setWindSpeed;
    this._actualTemperature = currentActualTemperature;
    this._windSpeed = currentWindSpeed;
    this._setResults = setResults;
  }

  changeUnits(temperatureUnit: Unit, speedUnit: Unit): void {
    this._temperatureUnit = temperatureUnit;
    this._speedUnit = speedUnit;
    this._callTryCalculateResults();
  }

  setActualTemperature(text: string): void {
    this._actualTemperature = text;
    this._setActualTemperature(text);
    this._callTryCalculateResults();
  }
  setWindSpeed(text: string): void {
    this._windSpeed = text;
    this._setWindSpeed(text);
    this._callTryCalculateResults();
  }
  tryCalculatingResults(
    actualTemperature: string,
    windSpeed: string,
    temperatureUnit: Unit,
    speedUnit: Unit
  ): void {
    if (!(actualTemperature && windSpeed)) {
      this._setResults(null);
      return;
    }
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
  }

  private _callTryCalculateResults() {
    this.tryCalculatingResults(
      this._actualTemperature,
      this._windSpeed,
      this._temperatureUnit,
      this._speedUnit
    );
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
    return false;
  }

  private _actualTemperature: string;
  private _windSpeed: string;
  private _temperatureUnit: Unit;
  private _speedUnit: Unit;
  private _setActualTemperature: (value: string) => void;
  private _setWindSpeed: (value: string) => void;
  private _setResults: (results: CalculationResults) => void;
}
