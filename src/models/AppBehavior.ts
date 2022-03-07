import { calculateWindChill } from "../services/calculateWindChill";
import { parseNonNegative, parseNumber } from "../utils/parsing";
import { speedUnits, temperatureUnits, Unit } from "./Unit";

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

export enum AppBehaviorType {
  Default = "Default",
  ResetInputsOnCalculate = "Reset on calculate",
  Automatic = "Automatic",
}

export const AppBehaviorTypes = [
  AppBehaviorType.Default,
  AppBehaviorType.ResetInputsOnCalculate,
  AppBehaviorType.Automatic,
];

export type CalculationResult = number | Error | null;

export type AppBehaviorCreateInfo = {
  currentActualTemperature: string;
  setActualTemperature: (value: string) => void;
  currentWindSpeed: string;
  setWindSpeed: (value: string) => void;
  setResults: (results: CalculationResult) => void;
};

export class DefaultBehavior implements IAppBehavior {
  constructor(
    setActualTemperature: (value: string) => void,
    setWindSpeed: (value: string) => void,
    setResults: (results: CalculationResult) => void,
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
    let results: CalculationResult;
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
  private _setResults: (results: CalculationResult) => void;
  private _resetInputOnCalculate: boolean;
}

export class AutomaticBehavior implements IAppBehavior {
  constructor(
    currentActualTemperature: string,
    setActualTemperature: (value: string) => void,
    currentWindSpeed: string,
    setWindSpeed: (value: string) => void,
    setResults: (results: CalculationResult) => void
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
    let results: CalculationResult;
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
  private _setResults: (results: CalculationResult) => void;
}

export function createAppBehavior(
  type: AppBehaviorType,
  {
    currentActualTemperature,
    setActualTemperature,
    currentWindSpeed,
    setWindSpeed,
    setResults,
  }: AppBehaviorCreateInfo
): IAppBehavior {
  switch (type) {
    case AppBehaviorType.Default:
      return new DefaultBehavior(
        setActualTemperature,
        setWindSpeed,
        setResults
      );
    case AppBehaviorType.ResetInputsOnCalculate:
      return new DefaultBehavior(
        setActualTemperature,
        setWindSpeed,
        setResults,
        true
      );
    case AppBehaviorType.Automatic:
      return new AutomaticBehavior(
        currentActualTemperature,
        setActualTemperature,
        currentWindSpeed,
        setWindSpeed,
        setResults
      );
  }
}
