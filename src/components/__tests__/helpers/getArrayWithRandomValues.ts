import { faker } from '@faker-js/faker';

type TGetArrayWithRandomValuesArg = {
  minLength: number;
  maxLength: number;
  type: 'int' | 'object' | 'string';
};

type TGetArrayWithRandomValuesReturn<
  T extends TGetArrayWithRandomValuesArg['type'],
> = Array<
  T extends 'int'
    ? number
    : T extends 'object'
    ? { id: number; name: string }
    : T extends 'string'
    ? string
    : never
>;

type TFillerMethodReturn<T extends Array<unknown>> = T extends Array<
  infer U
>
  ? U
  : never;

export const getArrayWithRandomValues = (
  args: TGetArrayWithRandomValuesArg,
): TGetArrayWithRandomValuesReturn<(typeof args)['type']> => {
  const itemsCount = faker.number.int({
    min: args.minLength,
    max: args.maxLength,
  });

  let method: () => TFillerMethodReturn<
    TGetArrayWithRandomValuesReturn<(typeof args)['type']>
  >;

  switch (args.type) {
    case 'int':
      method = faker.number.int;
      break;
    case 'object':
      method = () => ({
        id: faker.number.int(),
        name: faker.word.sample(6),
      });
      break;
    case 'string':
      method = () => faker.word.sample(6);
  }

  return faker.helpers.multiple(method, {
    count: itemsCount,
  });
};
