import { describe, it, expect } from 'vitest';
import MyCheckbox from '../MyCheckbox';
import constants from '../MyCheckbox/utils/constants.script';
import { VueWrapper, mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { colors } from '@/assets/colors/colors';

const expectCheckboxToBeUnchecked = (wrapper: VueWrapper) => {
  expect(wrapper.get('input').attributes('value')).toBe('false');
  expect(wrapper.get('img').attributes('src')).toContain(
    constants.UNCHECKED_ICON_NAME,
  );
};

const expectCheckboxToBeChecked = (wrapper: VueWrapper) => {
  expect(wrapper.get('input').attributes('value')).toBe('true');
  expect(wrapper.get('img').attributes('src')).toContain(
    constants.CHECKED_ICON_NAME,
  );
  expect(wrapper.get('img').attributes('src')).not.toContain(
    constants.UNCHECKED_ICON_NAME,
  );
};

const expectCheckboxToBeIndeterminate = (wrapper: VueWrapper) => {
  expect(wrapper.get('input').attributes('value')).toBe('false');
  expect(wrapper.get('img').attributes('src')).toContain(
    constants.INDETERMINATE_ICON_NAME,
  );
};

describe('MyCheckbox', () => {
  it('renders the checkbox with default props', () => {
    const wrapper = mount(MyCheckbox);

    expect(wrapper.classes().join()).toStrictEqual('my-checkbox');

    expect(wrapper.find('div.my-checkbox').exists()).toBe(true);
    expectCheckboxToBeUnchecked(wrapper);
  });

  it('renders checked checkbox when passed modelValue is true', () => {
    const wrapper = mount(MyCheckbox, {
      props: {
        modelValue: true,
      },
    });

    expectCheckboxToBeChecked(wrapper);
  });

  it('renders unchecked checkbox when passed modelValue is false', () => {
    const wrapper = mount(MyCheckbox, {
      props: {
        modelValue: false,
      },
    });

    expectCheckboxToBeUnchecked(wrapper);
  });

  it('changes modelValue and input value when clicked', async () => {
    const checkboxValue = faker.datatype.boolean();

    const wrapper: VueWrapper = mount(MyCheckbox, {
      props: {
        modelValue: checkboxValue,
        'onUpdate:modelValue': (newValue) =>
          wrapper.setProps({ modelValue: newValue }),
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(
      !checkboxValue,
    );
    expect(wrapper.get('input').attributes('value')).toBe(
      `${!checkboxValue}`,
    );
  });

  it('renders indeterminate state when modelValue is undefined', () => {
    const wrapper = mount(MyCheckbox, {
      props: {
        indeterminate: true,
      },
    });

    expectCheckboxToBeIndeterminate(wrapper);
  });

  it('does not render indeterminate state when modelValue is not undefined', () => {
    const checkboxValue = faker.datatype.boolean();

    const wrapper = mount(MyCheckbox, {
      props: {
        indeterminate: true,
        modelValue: checkboxValue,
      },
    });

    expect(wrapper.get('img').attributes('src')).not.toContain(
      constants.INDETERMINATE_ICON_NAME,
    );
  });

  it('after clicked on indeterminated checkbox it switched to checked state', async () => {
    const wrapper: VueWrapper = mount(MyCheckbox, {
      props: {
        indeterminate: true,
        'onUpdate:modelValue': (newValue) =>
          wrapper.setProps({ modelValue: newValue }),
      },
    });

    await wrapper.find('div.my-checkbox').trigger('click');

    expectCheckboxToBeChecked(wrapper);
  });

  it('changes checkbox to indeterminated when modelValue changed to undefined', async () => {
    const checkboxValue = faker.datatype.boolean();

    const wrapper = mount(MyCheckbox, {
      props: {
        indeterminate: true,
        modelValue: checkboxValue,
      },
    });

    expect(wrapper.get('img').attributes('src')).not.toContain(
      constants.INDETERMINATE_ICON_NAME,
    );

    await wrapper.setProps({
      modelValue: undefined,
    });

    expectCheckboxToBeIndeterminate(wrapper);
  });

  it('applies custom color class when color passed as non-hex value', () => {
    const [colorName, colorValue] = faker.helpers.objectEntry(colors);

    const wrapper = mount(MyCheckbox, {
      props: {
        modelValue: true,
        color: colorName,
      },
    });

    expect(wrapper.get('img').attributes('src')).toContain(
      `${colorValue.slice(1)}`,
    );
  });

  it('applies passed hex value inside color style property', () => {
    const hexColor = faker.color.rgb();

    const wrapper = mount(MyCheckbox, {
      props: {
        modelValue: true,
        color: hexColor,
      },
    });

    expect(wrapper.get('img').attributes('src')).toContain(
      `${hexColor.slice(1)}`,
    );
  });

  it('renders the disabled checkbox', async () => {
    const checkboxValue = faker.datatype.boolean();

    const wrapper: VueWrapper = mount(MyCheckbox, {
      props: {
        disabled: true,
        modelValue: checkboxValue,
        'onUpdate:modelValue': (newValue) =>
          wrapper.setProps({ modelValue: newValue }),
      },
    });

    await wrapper.find('div.my-checkbox').trigger('click');

    expect(wrapper.get('div.my-checkbox').classes()).toContain(
      'my-checkbox--disabled',
    );
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    expect(wrapper.get('input').attributes('value')).toBe(
      `${checkboxValue}`,
    );
  });

  it('renders the readonly checkbox', async () => {
    const checkboxValue = faker.datatype.boolean();

    const wrapper: VueWrapper = mount(MyCheckbox, {
      props: {
        readonly: true,
        modelValue: checkboxValue,
        'onUpdate:modelValue': (newValue) =>
          wrapper.setProps({ modelValue: newValue }),
      },
    });

    await wrapper.find('div.my-checkbox').trigger('click');

    expect(wrapper.get('div.my-checkbox').classes()).toContain(
      'my-checkbox--readonly',
    );
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    expect(wrapper.get('input').attributes('value')).toBe(
      `${checkboxValue}`,
    );
  });
});
