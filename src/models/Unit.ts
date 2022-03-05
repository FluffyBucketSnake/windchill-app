export type Unit = {
    id: UnitId,
    friendlyName: string,
    suffix: string,
};

export type UnitId = 'celsius' | 'fahrenheit' | 'kph' | 'mph';

export const temperatureUnits: Unit[] = [
    {
        id: 'celsius',
        friendlyName: 'Celsius',
        suffix: 'ºC',
    },
    {
        id: 'fahrenheit',
        friendlyName: 'Fahrenheit',
        suffix: 'ºF',
    },
];

export const speedUnits: Unit[] = [
    {
        id: 'kph',
        friendlyName: 'Metric',
        suffix: 'km/h',
    },
    {
        id: 'mph',
        friendlyName: 'Imperial',
        suffix: 'mph',
    },
];