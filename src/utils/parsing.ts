export function parseNumber(text: string, context: string): number {
  if (!text) {
    throw new Error(`Input a ${context} value.`);
  }
  if (!text.match(/^\-?\d+(.\d+)?$/)) {
    throw new Error(`${capitalizeFirst(context)} is not a valid number.`);
  }
  return parseFloat(text);
}

export function parseNonNegative(text: string, context: string): number {
  const result = parseNumber(text, context);
  if (result < 0) {
    throw new Error(`${capitalizeFirst(context)} cannot be negative.`);
  }
  return result;
}

const capitalizeFirst: (text: string) => string = (text) =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
