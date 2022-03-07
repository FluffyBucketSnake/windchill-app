import { calculateWindChill } from "../services/calculateWindChill";
import { parseNonNegative, parseNumber } from "../utils/parsing";
import { Unit } from "./Unit";

export interface IAppBehavior {
  setActualTemperature(text: string): void;
  setWindSpeed(text: string): void;
  tryCalculatingResults(
    actualTemperature: string,
    windSpeed: string,
    actualTemperatureUnit: Unit,
    windSpeedUnit: Unit
  ): void;

  get showCalculateButton(): boolean;
}

export enum AppBehaviorType {
  Default = "Default",
  ResetInputsOnCalculate = "Reset on calculate",
}

export const AppBehaviorTypes = [
  AppBehaviorType.Default,
  AppBehaviorType.ResetInputsOnCalculate,
];

export type AppBehaviorCreateInfo = {
  setActualTemperature: (value: string) => void;
  setWindSpeed: (value: string) => void;
  setPerceivedTemperature: (value: number) => void;
  onError: (err: Error) => void;
};

export class DefaultBehavior implements IAppBehavior {
  constructor(
    setActualTemperature: (value: string) => void,
    setWindSpeed: (value: string) => void,
    setPerceivedTemperature: (value: number) => void,
    onError: (err: Error) => void,
    resetInputOnCalculate: boolean = false
  ) {
    this._setActualTemperatureState = setActualTemperature;
    this._setWindSpeedState = setWindSpeed;
    this._setPerceivedTemperature = setPerceivedTemperature;
    this._onError = onError;
    this._resetInputOnCalculate = resetInputOnCalculate;
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
    try {
      this._setPerceivedTemperature(
        this._calculateResults(
          actualTemperature,
          windSpeed,
          temperatureUnit,
          speedUnit
        )
      );
    } catch (err) {
      this._onError(err as Error);
      return;
    }
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
  private _setPerceivedTemperature: (value: number) => void;
  private _onError: (err: Error) => void;
  private _resetInputOnCalculate: boolean;
}

export function createAppBehavior(
  type: AppBehaviorType,
  {
    setActualTemperature,
    setWindSpeed,
    setPerceivedTemperature,
    onError,
  }: AppBehaviorCreateInfo
): IAppBehavior {
  switch (type) {
    case AppBehaviorType.Default:
      return new DefaultBehavior(
        setActualTemperature,
        setWindSpeed,
        setPerceivedTemperature,
        onError
      );
    case AppBehaviorType.ResetInputsOnCalculate:
      return new DefaultBehavior(
        setActualTemperature,
        setWindSpeed,
        setPerceivedTemperature,
        onError,
        true
      );
  }
}
