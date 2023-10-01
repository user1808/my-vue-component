import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MyTooltip from '../MyTooltip';
import MyButton from '../MyButton';

describe('MyTooltip', () => {
  it('renders tooltip with default props', async () => {
    const wrapper = mount(MyTooltip, {
      slots: {
        default: MyButton,
        'tooltip-content': () => undefined,
      },
    });

    expect(wrapper.findComponent(MyButton).exists()).toBe(true);
    expect(wrapper.find('div.my-tooltip-box').exists()).toBe(true);
  });
});
