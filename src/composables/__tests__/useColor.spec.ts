import { describe, it, expect } from 'vitest';
import { useColor } from '../useColor';
import { faker } from '@faker-js/faker';

describe('useColor', () => {
  const { isHexColorValue, parseRGBAString } = useColor();

  it('checks if passed value is the hex color value', () => {
    const notHexValue = faker.word.sample(5);
    const wrongHexValue = `#${faker.word.sample(6)}`;
    const hexValue = faker.color.rgb();
    const hexValueWithAlpha = faker.color.rgb({
      includeAlpha: true,
    });

    expect(isHexColorValue(notHexValue)).toBe(false);
    expect(isHexColorValue(wrongHexValue)).toBe(false);
    expect(isHexColorValue(hexValue)).toBe(true);
    expect(isHexColorValue(hexValueWithAlpha)).toBe(true);
  });

  it('checks if composable parses rgba string value properly', () => {
    const rgbaStringValue = faker.color.rgb({
      includeAlpha: true,
      format: 'css',
    });
    const rgbaValues = Array.from(
      rgbaStringValue.matchAll(/[\d.]+/g),
    ).map((match) => Number(match[0]));

    const rgbStringValue = faker.color.rgb({
      format: 'css',
    });
    const rgbValues = Array.from(
      rgbStringValue.matchAll(/[\d.]+/g),
    ).map((match) => Number(match[0]));

    const wrongValue = faker.word.sample(10);

    expect(parseRGBAString(rgbaStringValue)).toStrictEqual({
      r: rgbaValues[0],
      g: rgbaValues[1],
      b: rgbaValues[2],
      a: rgbaValues[3],
    });

    expect(parseRGBAString(rgbStringValue)).toStrictEqual({
      r: rgbValues[0],
      g: rgbValues[1],
      b: rgbValues[2],
      a: 1,
    });

    expect(parseRGBAString(wrongValue)).toBeNull();
  });
});
