import { useCallback, useEffect, useMemo, useState } from "react";
import { AppBehaviorType, createAppBehavior } from "../models/AppBehavior";
import { Options } from "../models/Options";

export function useAppBehavior(
  { appBehavior: type, temperatureUnit, speedUnit }: Options,
  onError: (err: Error) => void
): [
  (text: string) => void,
  (text: string) => void,
  () => void,
  string,
  string,
  number | null,
  boolean
] {
  const [actualTemperature, setActualTemperatureState] = useState<string>("");
  const [windSpeed, setWindSpeedState] = useState<string>("");
  const [perceivedTemperature, setPerceivedTemperature] = useState<
    number | null
  >(null);

  const appBehavior = useMemo(
    () =>
      createAppBehavior(type, {
        currentActualTemperature: actualTemperature,
        setActualTemperature: setActualTemperatureState,
        currentWindSpeed: windSpeed,
        setWindSpeed: setWindSpeedState,
        setPerceivedTemperature,
        onError,
      }),
    [
      type,
      setActualTemperatureState,
      setWindSpeedState,
      setPerceivedTemperature,
      onError,
    ]
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
    perceivedTemperature,
    appBehavior.showCalculateButton,
  ];
}
