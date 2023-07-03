import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AsyncThunkAction, SerializedError } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

// type RequestError = SerializedError | null;
// type UseThunkType = [() => Promise<unknown>, boolean, RequestError];
// type AsyncThunkActionCreator<R, T> = (
//   args: T,
// ) => AsyncThunkAction<R, T, object>;
//
// function useThunk<R, T>(
//   thunk: AsyncThunkActionCreator<R, T>,
//   args: T | null = null,
// ): UseThunkType {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<RequestError>(null);
//   const dispatch = useDispatch<AppDispatch>();
//
//   const runThunk = useCallback(() => {
//     setIsLoading(true);
//     return dispatch(thunk(args as T))
//       .unwrap()
//       .catch((err: SerializedError) => setError(err))
//       .finally(() => setIsLoading(false));
//   }, [dispatch, thunk, args]);
//
//   return [runThunk, isLoading, error];
// }
//
// export { useThunk };

type RequestError = SerializedError | null;

function useThunk<R, T>(
  thunk: (arg: T) => AsyncThunkAction<R, T, object>,
  arg: T | null = null,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RequestError>(null);
  const dispatch = useDispatch<AppDispatch>();

  /*
   *  Function to run the thunk, dispatch it and update the loading state
   *  and the error state.
   */
  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk(arg as T))
      .unwrap()
      .catch((err: SerializedError) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk, arg]);

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
