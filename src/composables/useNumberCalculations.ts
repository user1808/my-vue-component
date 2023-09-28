type TIsInRange = boolean;

/**
 * A utility for performing simple number calculations that are commonly used throughout the codebase.
 */
export const useNumberCalculations = () => {
  /**
   * Determines whether a numeric value falls within a specified range.
   *
   * @param value - The numeric value to check.
   * @param min - The minimum value of the range (inclusive).
   * @param max - The maximum value of the range (inclusive).
   *
   * @returns A boolean indicating whether the value is within the specified range.
   */
  const isInRange = (
    value: number,
    min: number,
    max: number,
  ): TIsInRange => {
    return value >= min && value <= max;
  };

  return {
    isInRange,
  };
};
