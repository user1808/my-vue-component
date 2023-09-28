import { faker } from '@faker-js/faker';
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MySelect from '../MySelect';
import { getArrayWithRandomValues } from './helpers/getArrayWithRandomValues';

const expectSelectOptionVisibility = (
  wrapper: VueWrapper,
  visibilityExpectations: boolean,
) => {
  expect(wrapper.find('ul.my-select-content-options').exists()).toBe(
    visibilityExpectations,
  );
};

const expectTextInsideSelect = (
  wrapper: VueWrapper,
  text: string,
) => {
  expect(
    wrapper.get('span.my-select-content-btn__selected-value').text(),
  ).toBe(text);
};

const expectClearSelect = (wrapper: VueWrapper) => {
  expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  expect(wrapper.emitted('update:modelValue')![0][0]).toBe(null);
};

const triggerOpenSelectOptions = async (wrapper: VueWrapper) => {
  await wrapper.get('button.my-select-content-btn').trigger('click');
};

const triggerChooseOption = async (
  wrapper: VueWrapper,
  optionNumber: number,
) => {
  wrapper
    .findAll('li.my-select-option')
    [optionNumber].trigger('click');
};

const triggerClickClearIcon = async (wrapper: VueWrapper) => {
  await wrapper.get('div.my-select-clear-icon').trigger('click');
};

describe('MySelect', () => {
  it('renders the select with default props', () => {
    const items = getArrayWithRandomValues({
      minLength: 1,
      maxLength: 15,
      type: 'int',
    });

    const wrapper = mount(MySelect, {
      props: {
        items: items,
      },
    });

    expect(wrapper.find('div.my-select').exists()).toBe(true);
  });

  it('shows that select is working properly', async () => {
    const items = getArrayWithRandomValues({
      minLength: 1,
      maxLength: 15,
      type: 'int',
    });
    const selectedItemIdx = faker.number.int(items.length - 1);

    const wrapper: VueWrapper = mount(MySelect, {
      props: {
        items: items,
        modelValue: undefined,
        'onUpdate:modelValue': (newValue: number) => {
          wrapper.setProps({ modelValue: newValue });
        },
      },
    });

    expectSelectOptionVisibility(wrapper, false);

    await triggerOpenSelectOptions(wrapper);

    expectSelectOptionVisibility(wrapper, true);

    await triggerChooseOption(wrapper, selectedItemIdx);

    expectSelectOptionVisibility(wrapper, false);

    expect(wrapper.props('modelValue')).toBe(items[selectedItemIdx]);
  });

  it('works with object items', async () => {
    const items = <Array<{ id: number; name: string }>>(
      getArrayWithRandomValues({
        minLength: 1,
        maxLength: 15,
        type: 'object',
      })
    );
    const selectedItemIdx = faker.number.int(items.length - 1);

    const wrapper = mount(MySelect<{ id: number; name: string }>, {
      props: {
        items: items,
        modelValue: undefined,
        'onUpdate:modelValue': (newValue: number) => {
          wrapper.setProps({ modelValue: newValue });
        },
        itemTitle: 'name',
        itemValue: 'id',
      },
    });

    await triggerOpenSelectOptions(wrapper);

    await triggerChooseOption(wrapper, selectedItemIdx);

    expectTextInsideSelect(wrapper, items[selectedItemIdx].name);

    expect(wrapper.props('modelValue')).toStrictEqual(
      items[selectedItemIdx],
    );
  });

  it('renders select with clearable prop', async () => {
    const items = <Array<string>>getArrayWithRandomValues({
      minLength: 1,
      maxLength: 10,
      type: 'string',
    });
    const selectedItem = faker.number.int(items.length - 1);

    const wrapper = mount(MySelect, {
      props: {
        modelValue: items[selectedItem],
        items: items,
        clearable: true,
      },
    });

    expectTextInsideSelect(wrapper, items[selectedItem]);

    await triggerClickClearIcon(wrapper);

    expectClearSelect(wrapper);
  });

  it('renders disabled select', async () => {
    const items = getArrayWithRandomValues({
      minLength: 1,
      maxLength: 10,
      type: 'string',
    });

    const wrapper = mount(MySelect, {
      props: {
        items: items,
        disabled: true,
      },
    });

    await triggerOpenSelectOptions(wrapper);

    expectSelectOptionVisibility(wrapper, false);
  });
});
