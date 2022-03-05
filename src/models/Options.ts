import { speedUnits, temperatureUnits, Unit } from "./Unit";

export type Options = {
    temperatureUnit: Unit,
    speedUnit: Unit,
};

export const DefaultOptions: Options = {
    temperatureUnit: temperatureUnits[0],
    speedUnit: speedUnits[0],
}