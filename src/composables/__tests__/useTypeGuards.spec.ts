import { describe, expect, it } from 'vitest';
import { useTypeGuards } from '../useTypeGuards';
import { faker } from '@faker-js/faker';

describe('useTypeGuard', () => {
  const { isObject } = useTypeGuards();
  it('checks if passed value is object', () => {
    const object = {
      [faker.word.sample()]: faker.number.int(),
    };
    const nonObject = faker.word.sample();

    expect(isObject(object)).toBe(true);
    expect(isObject(nonObject)).toBe(false);
  });
});
