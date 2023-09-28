import { faker } from '@faker-js/faker';

type TGetHexAndRgbColor = (seed?: number) => {
  hexColor: string;
  rgbColor: string;
};

export const getHexAndRgbColor: TGetHexAndRgbColor = (seed) => {
  const generatedSeed = faker.seed(seed);
  const colorValues = faker.color.rgb({
    format: 'decimal',
  });
  const hexColor: string = `#${colorValues
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`;
  faker.seed(generatedSeed);
  const rgbColor: string = faker.color.rgb({
    format: 'css',
  });

  return { hexColor, rgbColor };
};
