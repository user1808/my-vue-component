export {};

declare global {
  /**
   * Alias for type that could be `null`
   * 
   * @typeParam T - any type that you want
   */
  type Nullable<T> = T | null;
  /**
   * Alias for type that could be `undefined`
   * 
   * @typeParam T - any type that you want
   */
  type Undefinedable<T> = T | undefined;
  /**
   * Alias for type that could be `null` or `undefined`
   * 
   * @typeParam T - any type that you want
   */
  type Absentable<T> = Nullable<T> | Undefinedable<T>;
}
