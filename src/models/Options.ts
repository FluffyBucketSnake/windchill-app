import { AppBehaviorType } from "./createAppBehavior";
import { speedUnits, temperatureUnits, Unit } from "./Unit";

export type Options = {
  appBehavior: AppBehaviorType;
  temperatureUnit: Unit;
  speedUnit: Unit;
};

export const DefaultOptions: Options = {
  appBehavior: AppBehaviorType.Default,
  temperatureUnit: temperatureUnits[0],
  speedUnit: speedUnits[0],
};
