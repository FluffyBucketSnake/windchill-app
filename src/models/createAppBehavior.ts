import { AutomaticBehavior } from "./AutomaticBehavior";
import { DefaultBehavior } from "./DefaultBehavior";
import { CalculationResults, IAppBehavior } from "./IAppBehavior";

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

export type AppBehaviorCreateInfo = {
  currentActualTemperature: string;
  setActualTemperature: (value: string) => void;
  currentWindSpeed: string;
  setWindSpeed: (value: string) => void;
  setResults: (results: CalculationResults) => void;
};

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
