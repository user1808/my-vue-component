import { describe, it, expect } from 'vitest';
import { useNumberCalculations } from '../useNumberCalculations';
import { faker } from '@faker-js/faker';

describe('useNumberCalculations', () => {
  const { isInRange } = useNumberCalculations();
  it('checks if number is in range', () => {
    const min = faker.number.int();
    const max = faker.number.int({
      min: min,
    });
    const value = faker.number.int({
      min,
      max,
    });

    expect(isInRange(value, min, max)).toBe(true);
    expect(isInRange(value, -max, -min)).toBe(false);
  });
});
