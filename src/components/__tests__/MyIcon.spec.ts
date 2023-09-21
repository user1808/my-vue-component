import { describe, expect, it } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import MyIcon from '../MyIcon';
import { faker } from '@faker-js/faker';
import { colors } from '@/assets/colors/colors';

const generateIconProps = () => {
  return {
    name: faker.word.sample(5),
    library: faker.word.sample(10),
  };
};

const expectIconPropsToAppearInSrc = (
  wrapper: VueWrapper,
  {
    name,
    library,
    color,
  }: { name: string; library: string; color?: string },
) => {
  expect(wrapper.get('img').attributes('src')).toEqual(
    `https://api.iconify.design/${library}:${name}.svg${
      color ? `?color=%23${color}` : ''
    }`,
  );
};

describe('MyIcon', () => {
  it('should passed props into src of img and show icon', () => {
    const { name, library } = generateIconProps();

    const wrapper = mount(MyIcon, {
      props: {
        name,
        library,
      },
    });

    expect(wrapper.find('div.my-icon').exists()).toBe(true);
    expectIconPropsToAppearInSrc(wrapper, {
      name,
      library,
    });
  });

  it('renders icon with passed color that belongs to my custom colors classes', () => {
    const [colorName, colorValue] = faker.helpers.objectEntry(colors);
    const { name, library } = generateIconProps();

    const wrapper = mount(MyIcon, {
      props: {
        name,
        library,
        color: colorName,
      },
    });

    expectIconPropsToAppearInSrc(wrapper, {
      name,
      library,
      color: colorValue.slice(1),
    });
  });

  it('renders icon with passed hex color', () => {
    const color = faker.color.rgb();
    const { name, library } = generateIconProps();

    const wrapper = mount(MyIcon, {
      props: {
        name,
        library,
        color: color,
      },
    });

    expectIconPropsToAppearInSrc(wrapper, {
      name,
      library,
      color: color.slice(1),
    });
  });
});
