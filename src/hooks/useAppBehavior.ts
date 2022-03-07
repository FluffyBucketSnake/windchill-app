import { useCallback, useEffect, useMemo, useState } from "react";
import { AppBehaviorType, createAppBehavior } from "../models/AppBehavior";
import { Options } from "../models/Options";

export function useAppBehavior(
  type: AppBehaviorType,
  options: Options,
  onError: (err: Error) => void
): [(text: string) => void, (text: string) => void, () => void, number | null] {
  const [actualTemperature, setActualTemperatureState] = useState<string>("");
  const [windSpeed, setWindSpeedState] = useState<string>("");
  const [perceivedTemperature, setPerceivedTemperature] = useState<
    number | null
  >(null);

  const appBehavior = useMemo(
    () =>
      createAppBehavior(type, {
        setActualTemperature: setActualTemperatureState,
        setWindSpeed: setWindSpeedState,
        setPerceivedTemperature,
        onError,
      }),
    [
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
        options.temperatureUnit,
        options.speedUnit
      ),
    [actualTemperature, windSpeed, options]
  );

  useEffect(() => {
    setPerceivedTemperature(null);
  }, [options]);

  return [
    setActualTemperature,
    setWindSpeed,
    tryCalculatingResults,
    perceivedTemperature,
  ];
}
