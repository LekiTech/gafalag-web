import React from "react";
import * as DOMURL from "jsurl";
import { NavigateOptions, useSearchParams } from "react-router-dom";

/**
 * This custom hook is a wrapper around `useSearchParams()` that parses and
 * serializes the search param value using the JSURL library, which permits any
 * JavaScript value to be safely URL-encoded.
 *
 * It's a good example of how React hooks offer a great deal of flexibility when
 * you compose them together!
 *
 * TODO: rethink the generic type here, users can put whatever they want in the
 * URL, probably best to use runtime validation with a type predicate:
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export function useQueryParam<T>(
  key: string
): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);
  let value = React.useMemo(() => DOMURL.parse(paramValue), [paramValue]);

  let setValue = React.useCallback(
    (newValue: T, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, DOMURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}