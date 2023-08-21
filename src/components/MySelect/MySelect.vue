<template>
  <div class="my-select">
    <Listbox
      :model-value="selectedItem"
      @update:model-value="onModelValueUpdate"
      v-slot="{ open }"
    >
      <div class="my-select-content">
        <ListboxButton
          class="my-select-content-btn"
          :class="{
            'my-select-content-btn--open': open,
            'my-select-content-btn--disabled my-outline-grey-100 my-bg-grey-50':
              disabled,
            'my-select-content-btn--clearable': clearable,
          }"
          :disabled="disabled"
        >
          <slot name="selected" :item="selectedItem">
            <span class="my-select-content-btn__selected-value">
              {{ getItemTitle(selectedItem) }}
            </span>
          </slot>
          <MySelectClearIcon
            :clearable="clearable"
            :disabled="disabled"
            :open="open"
            :is-item-selected="!!selectedItem"
            @clear="onSelectClear"
          />
          <MySelectOpenIcon :open="open" :disabled="disabled" />
        </ListboxButton>
        <Transition name="options-transition">
          <ListboxOptions class="my-select-content-options">
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(item, idx) in items"
              :key="idx"
              :value="getItemValue(item)"
              as="template"
            >
              <MySelectOption
                :active="active"
                :selected="selected"
                :font-size="optionsFontSize"
                :item-title="getItemTitle(item)"
              >
                <slot name="option" :item="item"></slot>
              </MySelectOption>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends string | number | boolean | object"
>
import { ref, type Ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import MySelectClearIcon from './MySelectClearIcon.vue';
import MySelectOption from './MySelectOption.vue';
import MySelectOpenIcon from './MySelectOpenIcon.vue';
import { useTypeGuards } from '@/composables/useTypeGuards';
import type {
  TMySelectProps,
  TItemTitleAndValue,
} from './utils/my-select.types';
import constants from './utils/constants.script';

const { isObject } = useTypeGuards();

const props = withDefaults(defineProps<TMySelectProps<T>>(), {
  selectedFontSize: constants.DEFAULT_SELECTED_FONT_SIZE,
  optionsFontSize: constants.DEFAULT_OPTIONS_FONT_SIZE,
  maxOptionItems: constants.DEFAULT_MAX_OPTION_ITEMS,
  clearable: constants.DEFAULT_CLEARABLE,
  disabled: constants.DEFAULT_DISABLED,
});

const selectedItem = ref<Absentable<T>>(props.modelValue) as Ref<
  Absentable<T>
>;

const getItemProperty = (
  item: Absentable<T>,
  key: Undefinedable<TItemTitleAndValue<T>>,
) => {
  if (isObject(item)) {
    return key ? item[key] ?? item : item;
  } else {
    return item ?? '';
  }
};

const getItemValue = (item: Absentable<T>) => {
  return getItemProperty(item, props.itemValue);
};
const getItemTitle = (item: Absentable<T>) => {
  return getItemProperty(item, props.itemTitle);
};

const emits = defineEmits<{
  'update:modelValue': [value: Nullable<T>];
}>();

const onModelValueUpdate = (newValue: T) => {
  selectedItem.value = newValue;
  emits('update:modelValue', newValue);
};

const onSelectClear = () => {
  selectedItem.value = null;
  emits('update:modelValue', null);
};

defineSlots<{
  selected(props: { item: Absentable<T> }): any;
  option(props: { item: T }): any;
}>();
</script>

<style scoped lang="scss">
$selected-font-size: calc(v-bind('$props.selectedFontSize') * 1px);
$options-font-size: calc(v-bind('$props.optionsFontSize') * 1px);
$max-option-items: v-bind('$props.maxOptionItems');

@use './MySelect.scss' with (
  $selected-font-size: $selected-font-size,
  $options-font-size: $options-font-size,
  $max-option-items: $max-option-items
);
</style>
