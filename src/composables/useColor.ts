import { useNumberCalculations } from './useNumberCalculations';

type TIsHex = boolean;
type TRGBAColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};
type TRGBColor = Omit<TRGBAColor, 'a'>;

const { isInRange } = useNumberCalculations();

export const useColor = () => {
  const isHexColorValue = (value: Absentable<string>): TIsHex => {
    return (
      !!value &&
      /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/i.test(
        value,
      )
    );
  };

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

  const rgbaToRgb = (rgbaColor: TRGBAColor): TRGBColor => {
    const { r, g, b, a } = rgbaColor;

    return {
      r: (1 - a) * 255 + a * r,
      g: (1 - a) * 255 + a * g,
      b: (1 - a) * 255 + a * b,
    };
  };

  const calculateContrast = (
    color1: TRGBColor,
    color2: TRGBColor,
  ) => {
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
