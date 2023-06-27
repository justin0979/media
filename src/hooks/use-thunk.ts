import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { AppDispatch, UsersType } from "../store";

type RequestError = SerializedError | null;

function useThunk(thunk: AsyncThunk<UsersType[], void, any>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RequestError>(null);
  const dispatch = useDispatch<AppDispatch>();

  /*
   *  Function to run the thunk, dispatch it and update the loading state
   *  and the error state.
   */
  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err: SerializedError) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  /*
   *  Without `as const`, will give following errors:
   *   "TS2349: This expression is not callable. Not all constituents of type
   *   'boolean | SerialziedError | (() => void)' are callable."
   *  "TS2721: Cannot invoke an object which is possible 'null'."
   *  see https://www.github.com/microsoft/TypeScript/issues/35423
   *  see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
   */
  return [runThunk, isLoading, error] as const;
}

export type { RequestError };
export { useThunk };
