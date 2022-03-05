import { useState } from "react";

export type Parser = (text: string) => string | null | Error;

export function useParsedState(parser: Parser, onError: (err: Error) => void) {
  const [state, setState] = useState<number | null>();
}
