import { describe, it, expect } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import MySwitch from '../MySwitch';
import { faker } from '@faker-js/faker';
import { colors } from '@/assets/colors/colors';
import { getHexAndRgbColor } from './helpers/getHexAndRgbColor';

const expectSwitchToBeActive = (wrapper: VueWrapper) => {
  expect(wrapper.get('div.my-switch-control').classes()).toContain(
    'my-switch-control--active',
  );
};

const expectSwitchToBeInactive = (wrapper: VueWrapper) => {
  expect(
    wrapper.get('div.my-switch-control').classes(),
  ).not.toContain('my-switch-control--active');
};

const expectSwitchToBeIndeterminate = (wrapper: VueWrapper) => {
  expect(wrapper.get('div.my-switch-control').classes()).toContain(
    'my-switch-control--indeterminate',
  );
};

const expectSwitchToBeDeterminate = (wrapper: VueWrapper) => {
  expect(
    wrapper.get('div.my-switch-control').classes(),
  ).not.toContain('my-switch-control--indeterminate');
};

const expectSwitchInputValue = (
  wrapper: VueWrapper,
  value: boolean,
) => {
  expect(wrapper.get('input').attributes('value')).toBe(
    String(value),
  );
};

const expectSwitchInsetStyles = (wrapper: VueWrapper) => {
  expect(wrapper.get('div.my-switch__track').classes()).toContain(
    'my-switch__track--inset',
  );
  expect(
    wrapper.get('span.my-switch-control__thumb').classes(),
  ).toContain('my-switch-control__thumb--inset');
};

const expectUpdateModelValueEmit = (
  wrapper: VueWrapper,
  emittedValue: boolean,
) => {
  expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  expect(wrapper.emitted('update:modelValue')![0][0]).toBe(
    emittedValue,
  );
};

describe('MySwitch', () => {
  it('renders the switch with default props', () => {
    const wrapper = mount(MySwitch);

    expect(wrapper.classes().join()).toStrictEqual('my-switch');

    expect(wrapper.find('div.my-switch').exists()).toBe(true);
    expectSwitchInputValue(wrapper, false);
    expectSwitchToBeInactive(wrapper);
  });

  it('renders active switch when passed modelValue is true', () => {
    const wrapper = mount(MySwitch, {
      props: {
        modelValue: true,
      },
    });

    expectSwitchInputValue(wrapper, true);
    expectSwitchToBeActive(wrapper);
  });

  it('renders inactive switch when passed modelValue is false', () => {
    const wrapper = mount(MySwitch, {
      props: {
        modelValue: false,
      },
    });

    expectSwitchInputValue(wrapper, false);
    expectSwitchToBeInactive(wrapper);
  });

  it('changes modelValue and input value when clicked', async () => {
    const switchValue = faker.datatype.boolean();

    const wrapper: VueWrapper = mount(MySwitch, {
      props: {
        modelValue: switchValue,
        'onUpdate:modelValue': (newValue) =>
          wrapper.setProps({ modelValue: newValue }),
      },
    });

    await wrapper.trigger('click');

    expectUpdateModelValueEmit(wrapper, !switchValue);
    expectSwitchInputValue(wrapper, !switchValue);
  });

  it('renders indeterminate state when modelValue is undefined', () => {
    const wrapper = mount(MySwitch, {
      props: {
        indeterminate: true,
      },
    });

    expectSwitchInputValue(wrapper, false);
    expectSwitchToBeIndeterminate(wrapper);
  });

  it('does not render indeterminate state when modelValue is not undefined', () => {
    const switchValue = faker.datatype.boolean();

    const wrapper = mount(MySwitch, {
      props: {
        indeterminate: true,
        modelValue: switchValue,
      },
    });

    expectSwitchToBeDeterminate(wrapper);
  });

  it('after clicked on indeterminated switch it switched to checked state', async () => {
    const wrapper: VueWrapper = mount(MySwitch, {
      props: {
        indeterminate: true,
        'onUpdate:modelValue': (newValue) =>
          wrapper.setProps({ modelValue: newValue }),
      },
    });

    await wrapper.trigger('click');

    expectSwitchInputValue(wrapper, true);
    expectSwitchToBeActive(wrapper);
  });

  it('changes switch to indeterminated when modelValue changed to undefined', async () => {
    const switchValue = faker.datatype.boolean();

    const wrapper = mount(MySwitch, {
      props: {
        indeterminate: true,
        modelValue: switchValue,
      },
    });

    expectSwitchToBeDeterminate(wrapper);

    await wrapper.setProps({
      modelValue: undefined,
    });

    expectSwitchToBeIndeterminate(wrapper);
  });

  it('applies custom color class when color passed as non-hex value', () => {
    const color = faker.helpers.objectKey(colors);

    const wrapper = mount(MySwitch, {
      props: {
        modelValue: true,
        color: color,
      },
    });

    expect(wrapper.get('div.my-switch__track').classes()).toContain(
      `my-bg-${color}`,
    );
  });

  it('applies passed hex value inside color style property', () => {
    const { hexColor, rgbColor } = getHexAndRgbColor();

    const wrapper = mount(MySwitch, {
      props: {
        modelValue: true,
        color: hexColor,
      },
    });

    expect(
      wrapper.get('div.my-switch__track').attributes('style'),
    ).toContain(`background-color: ${rgbColor}`);
  });

  it('renders inset version of switch', () => {
    const wrapper = mount(MySwitch, {
      props: {
        inset: true,
      },
    });

    expectSwitchInsetStyles(wrapper);
  });
});
