import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AppBehaviorType,
  CalculationResult,
  createAppBehavior,
} from "../models/AppBehavior";
import { Options } from "../models/Options";

export function useAppBehavior({
  appBehavior: type,
  temperatureUnit,
  speedUnit,
}: Options): [
  (text: string) => void,
  (text: string) => void,
  () => void,
  string,
  string,
  CalculationResult,
  boolean
] {
  const [actualTemperature, setActualTemperatureState] = useState<string>("");
  const [windSpeed, setWindSpeedState] = useState<string>("");
  const [results, setResults] = useState<CalculationResult>(null);

  const appBehavior = useMemo(
    () =>
      createAppBehavior(type, {
        currentActualTemperature: actualTemperature,
        setActualTemperature: setActualTemperatureState,
        currentWindSpeed: windSpeed,
        setWindSpeed: setWindSpeedState,
        setResults,
      }),
    [type, setActualTemperatureState, setWindSpeedState, setResults]
  );

  const setActualTemperature = useCallback(
    (text: string) => appBehavior.setActualTemperature(text),
    [appBehavior]
  );
  const setWindSpeed = useCallback(
    (text: string) => appBehavior.setWindSpeed(text),
    [appBehavior]
  );
  const tryCalculatingResults = useCallback(
    () =>
      appBehavior.tryCalculatingResults(
        actualTemperature,
        windSpeed,
        temperatureUnit,
        speedUnit
      ),
    [actualTemperature, windSpeed, temperatureUnit, speedUnit]
  );

  useEffect(() => {
    appBehavior.changeUnits(temperatureUnit, speedUnit);
  }, [appBehavior, temperatureUnit, speedUnit]);

  return [
    setActualTemperature,
    setWindSpeed,
    tryCalculatingResults,
    actualTemperature,
    windSpeed,
    results,
    appBehavior.showCalculateButton,
  ];
}
