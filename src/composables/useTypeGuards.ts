/**
 * A utility function for storing Type Guards that are commonly used across components
 * or other files and are not specifically tied to the logic in a particular module.
 * For example, `isObject` is a type guard, but it is not directly related to
 * any specific logic, so it is included here.
 */
export const useTypeGuards = () => {
  /**
   * Type Guard that checks whether a given value is an object.
   *
   * @param item - The item to be checked.
   * @returns `true` if the item is an object, otherwise `false`.
   */
  const isObject = (item: any): item is object => {
    return !!item && typeof item === 'object';
  };

  return {
    isObject,
  };
};
