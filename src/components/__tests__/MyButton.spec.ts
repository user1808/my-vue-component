import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import MyButton from '../MyButton';
import { colors } from '@/assets/colors/colors';
import { getHexAndRgbColor } from './helpers/getHexAndRgbColor';

describe('MyButton', () => {
  it('renders the button with default props', () => {
    const wrapper = mount(MyButton);

    expect(wrapper.find('button.my-btn').exists()).toBe(true);

    expect(wrapper.classes().join()).toStrictEqual('my-btn');
  });

  it('emits a click event when clicked', async () => {
    const wrapper = mount(MyButton);

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('renders the button with custom text', () => {
    const customText = faker.word.sample();

    const wrapper = mount(MyButton, {
      slots: {
        default: customText,
      },
    });

    expect(wrapper.text()).toContain(customText);
  });

  it('applies custom background color class when color passed as non-hex value', () => {
    const colorName = faker.helpers.objectKey(colors);

    const wrapper = mount(MyButton, {
      props: {
        bgColor: colorName,
      },
    });

    expect(wrapper.classes()).toContain(`my-bg-${colorName}`);
  });

  it('applies passed hex value inside background style property', () => {
    const { hexColor, rgbColor } = getHexAndRgbColor();

    const wrapper = mount(MyButton, {
      props: {
        bgColor: hexColor,
      },
    });

    const buttonElement = wrapper.find('button.my-btn');
    expect(buttonElement.attributes('style')).toContain(
      `background-color: ${rgbColor}`,
    );
  });

  it('applies custom outline color class when color passed as non-hex value', () => {
    const colorName = faker.helpers.objectKey(colors);

    const wrapper = mount(MyButton, {
      props: {
        bgColor: colorName,
        bgColorVariant: 'outline',
      },
    });

    expect(wrapper.classes()).toContain(`my-outline-${colorName}`);
  });

  it('applies passed hex value inside outline-color style property', () => {
    const { hexColor, rgbColor } = getHexAndRgbColor();

    const wrapper = mount(MyButton, {
      props: {
        bgColor: hexColor,
        bgColorVariant: 'outline',
      },
    });

    const buttonElement = wrapper.find('button.my-btn');
    expect(buttonElement.attributes('style')).toContain(
      `outline-color: ${rgbColor}`,
    );
  });

  it('applies custom color class when color passed as non-hex value', () => {
    const colorName = faker.helpers.objectKey(colors);

    const wrapper = mount(MyButton, {
      props: {
        color: colorName,
      },
    });

    expect(wrapper.classes()).toContain(`my-${colorName}`);
  });

  it('applies passed hex value inside color style property', () => {
    const { hexColor, rgbColor } = getHexAndRgbColor();

    const wrapper = mount(MyButton, {
      props: {
        color: hexColor,
      },
    });

    const buttonElement = wrapper.find('button.my-btn');
    expect(buttonElement.attributes('style')).toContain(
      `color: ${rgbColor}`,
    );
  });

  it('renders the flat button when flat prop is set to true', () => {
    const wrapper = mount(MyButton, {
      props: {
        flat: true,
      },
    });

    expect(wrapper.classes()).toContain(`my-btn--flat`);
  });

  it('renders the button without changing color on hover when proper props is set', () => {
    const wrapper = mount(MyButton, {
      props: {
        withoutHoverColor: true,
      },
    });

    expect(wrapper.classes()).toContain(
      `my-btn--disable-hover-color`,
    );
  });

  it('renders the button with lowered opacity of content, which back to normal on hover', () => {
    const wrapper = mount(MyButton, {
      props: {
        contentHoverOpacity: true,
      },
    });

    expect(wrapper.find('span.my-btn__content--hover').exists()).toBe(
      true,
    );
  });

  it('renders the button with outline', () => {
    const wrapper = mount(MyButton, {
      props: {
        outlined: true,
      },
    });

    expect(wrapper.classes()).toContain(`my-btn--outlined`);
  });

  it('renders the disabled button', () => {
    const wrapper = mount(MyButton, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain(`my-btn--disabled`);
  });
});
