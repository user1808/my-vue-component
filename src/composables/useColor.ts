import { useNumberCalculations } from './useNumberCalculations';

type TIsHex = boolean;
type TColorContrast = number;

/**
 * Alias for the parameters of an RGBA color.
 */
export type TRGBAColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

/**
 * Alias for the parameters of an RGB color (without alpha channel).
 */
export type TRGBColor = Omit<TRGBAColor, 'a'>;

const { isInRange } = useNumberCalculations();

/**
 * A utility for working with color-related operations and manipulations.
 */
export const useColor = () => {
  /**
   * Checks whether the given string is a valid hex color value.
   *
   * @param value - The string to check.
   * @returns `true` if the value is a valid hex color, `false` otherwise.
   *
   * @example
   * ```js
   * // Returns false
   * isHexColorValue('000');
   *
   * // Returns true
   * isHexColorValue('#000');
   *
   * // Returns true
   * isHexColorValue('#1231');
   *
   * // Returns true for both 6 and 8 characters formats
   * isHexColorValue('#ab2300');
   * isHexColorValue('#aabb1119');
   *
   * // Returns false
   * isHexColorValue('#zzxxrr');
   *
   * // Returns false
   * isHexColorValue('hex');
   * ```
   */
  const isHexColorValue = (value: Absentable<string>): TIsHex => {
    return (
      !!value &&
      /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/i.test(
        value,
      )
    );
  };

  /**
   * Parses a string into an `RGBAColor` type. The input should have the `rgba(r, g, b, a)` or `rgb(r, g, b)` format with valid values.
   * If the input is not valid, `null` is returned.
   *
   * @param input - The string to parse.
   * @returns An `RGBAColor` object if the input is valid, or `null` otherwise.
   *
   * @example
   * ```js
   * // Returns { r: 122, g: 60, b: 30, a: 0.2 }
   * parseRGBAString('rgba(122, 60, 30, 0.2)');
   * // Returns { r: 30, g: 60, b: 15, a: 1 }
   * parseRGBAString('rgb(30, 60, 15)');
   * // Returns null
   * parseRGBAString('rgba(1000, 100, 900, 5)');
   * // Returns null
   * parseRGBAString('not color');
   * ```
   */
  const parseRGBAString = (input: string): Nullable<TRGBAColor> => {
    const rgbaMatch = input.match(
      /^rgba?\((\d+),\s?(\d+),\s?(\d+)(?:,\s?([\d]+.[\d]+))?\)/,
    );

    if (rgbaMatch) {
      const r = parseInt(rgbaMatch[1]);
      const g = parseInt(rgbaMatch[2]);
      const b = parseInt(rgbaMatch[3]);
      const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;

      if (
        isInRange(r, 0, 255) &&
        isInRange(g, 0, 255) &&
        isInRange(b, 0, 255) &&
        isInRange(a, 0, 1)
      ) {
        return { r, g, b, a };
      }
    }

    return null;
  };

  /**
   * Converts an RGBA color to RGB, which means both colors have the same look.
   * 
   * @param rgbaColor - The RGBA color to convert.
   * @returns An RGB color object.
   * 
   * @example
   * ```js
   * // Returns { r: 240, g: 232, b: 220 }
   * rgbaToRgb({ r: 180, g: 140, b: 80, a: 0.2 })
   * ```
   */
  const rgbaToRgb = (rgbaColor: TRGBAColor): TRGBColor => {
    const { r, g, b, a } = rgbaColor;

    return {
      r: Math.floor((1 - a) * 255 + a * r),
      g: Math.floor((1 - a) * 255 + a * g),
      b: Math.floor((1 - a) * 255 + a * b),
    };
  };

  /**
   * Calculates the contrast between two colors.
   * 
   * @param color1 - The first color.
   * @param color2 - The second color.
   * @returns The contrast value as a number.
   * 
   * $$contrast=\sqrt{(r_1 - r_2)^2 + (g_1 - g_2)^2 + (b_1 - b_2)^2}$$
   * where
   * $$r_1, r_2, g_1, g_2, b_1, b_2$$ are red, green and blue values of both colors
   *
   * @example
   * ```js
   * // Returns ~115.866
   * calculateContrast({ r: 120, g: 40, b: 100 }, { r: 20, g: 60, b: 45 }); 
   * ```
   */
  const calculateContrast = (
    color1: TRGBColor,
    color2: TRGBColor,
  ): TColorContrast => {
    const { r: r1, g: g1, b: b1 } = color1;
    const { r: r2, g: g2, b: b2 } = color2;
    return Math.pow(
      Math.pow(r1 - r2, 2) +
        Math.pow(g1 - g2, 2) +
        Math.pow(b1 - b2, 2),
      0.5,
    );
  };

  return {
    isHexColorValue,
    rgbaToRgb,
    parseRGBAString,
    calculateContrast,
  };
};
