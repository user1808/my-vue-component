<template>
  <div
    class="my-checkbox"
    :class="{
      'my-checkbox--disabled': disabled,
      'my-checkbox--readonly': readonly,
    }"
    @click="onCheckboxClicked"
  >
    <input
      class="my-checkbox__input"
      type="checkbox"
      :value="!!modelValue"
    />
    <MyIcon
      class="my-checkbox__icon"
      :class="{
        'my-checkbox__icon--checked': modelValue,
        'my-checkbox__icon--disabled': disabled,
      }"
      :name="checkboxIcon"
      :color="checkboxColor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type {
  TMyCheckboxProps,
  TIndeterminate,
  TCheckboxIcon,
  TColor,
} from './utils/my-checkbox.types';
import constants from './utils/constants.script';
import MyIcon from '../MyIcon';

const props = withDefaults(defineProps<TMyCheckboxProps>(), {
  indeterminate: constants.DEFAULT_INDETERMINATE,
  disabled: constants.DEFAULT_DISABLED,
  readonly: constants.DEFAULT_READONLY,
});

const checkboxIndeter = ref<TIndeterminate>(props.indeterminate);

const checkboxIcon = computed<TCheckboxIcon>(() => {
  return checkboxIndeter.value
    ? constants.INDETERMINATE_ICON_NAME
    : props.modelValue
    ? constants.CHECKED_ICON_NAME
    : constants.UNCHECKED_ICON_NAME;
});

const checkboxColor = computed<Undefinedable<TColor>>(() => {
  return props.modelValue && !props.disabled ? props.color : '';
});

const emits = defineEmits<{
  'update:modelValue': [newValue: boolean];
}>();

const onCheckboxClicked = () => {
  if (!props.disabled && !props.readonly) {
    checkboxIndeter.value = false;
    emits(
      'update:modelValue',
      typeof props.modelValue === 'boolean'
        ? !props.modelValue
        : true,
    );
  }
};
</script>

<style scoped lang="scss">
@use './MyCheckbox.scss';
</style>
