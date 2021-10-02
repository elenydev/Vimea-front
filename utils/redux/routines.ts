import { Action } from "deox";
/**
 * Creates a set of life-cycle actions that are
 * useful for asynchronous actions like fetching data
 *
 * ```ts
 * const fetchFoo = createRoutine<Foo, { id: string }>('FETCH_FOO')
 * const fetchAll = createRoutine<Foo[]>('FETCH_ALL_FOO')
 * ```
 *
 * @param typePrefix    prefix for action type
 * @typeparam Payload   the data to be merged into state, usually a domain object from your API
 * @typeparam Params    the metadata required to start a routine, for example the ID of an object
 */
export declare const createRoutine: RoutineCreator;
export interface Routine<Params, Payload, Error> {
  /**
   * Trigger the start of a Routine
   * ```ts
   * dispatch(fetchFoo.trigger({ id: '5'}))
   * ```
   */
  trigger: ((params?: Params) => Action<string, undefined, Params>) & {
    type: string;
    toString(): string;
  };
  /**
   * Signal the end of a Routine that was successful
   *
   * ```ts
   * dispatch(fetchFoo.success(foo))
   * ```
   */
  success: ((payload: Payload) => Action<string, Payload, undefined>) & {
    type: string;
    toString(): string;
  };
  /**
   * Signal the end of a Routine that failed
   *
   * ```ts
   * dispatch(fetchFoo.failure(error))
   * ```
   */
  failure: ((error: Error) => Action<string, Error, undefined>) & {
    type: string;
    toString(): string;
  };
  /**
   * The prefix the routine was created with
   */
  PREFIX: string;
  /**
   * Type used by `trigger()`, subscribe to this in your Saga
   */
  TRIGGER: string;
}
export declare type RoutineCreator = <Payload, Params = void>(
  prefix: string
) => Routine<Payload, Params, Error>;
