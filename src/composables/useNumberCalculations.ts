type TIsInRange = boolean;

export const useNumberCalculations = () => {
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
