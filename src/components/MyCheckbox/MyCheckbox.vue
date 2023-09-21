<template>
  <div
    class="my-checkbox"
    :class="{
      'my-checkbox--disabled': disabled,
      'my-checkbox--readonly': readonly,
    }"
    @click="onCheckboxClicked"
    v-ripple.touchstart.mousedown="ripple && !disabled"
  >
    <input
      class="my-checkbox__input"
      :class="{
        'my-checkbox__input--disabled': disabled,
      }"
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
import { computed, ref, watchEffect } from 'vue';
import type {
  TMyCheckboxProps,
  TIndeterminate,
  TCheckboxIcon,
  TColor,
} from './utils/my-checkbox.types';
import constants from './utils/constants.script';
import MyIcon from '../MyIcon';
import { useRippleDirective } from '@/composables/useRippleDirective';

const { vRipple } = useRippleDirective();

const props = withDefaults(defineProps<TMyCheckboxProps>(), {
  modelValue: constants.DEFAULT_MODEL_VALUE,
  indeterminate: constants.DEFAULT_INDETERMINATE,
  disabled: constants.DEFAULT_DISABLED,
  readonly: constants.DEFAULT_READONLY,
  ripple: constants.DEFAULT_RIPPLE,
});

const emits = defineEmits<{
  'update:modelValue': [newValue: boolean];
}>();

const indeterminateState = ref<TIndeterminate>(
  props.indeterminate && typeof props.modelValue === 'undefined',
);
watchEffect(() => {
  indeterminateState.value =
    props.indeterminate && typeof props.modelValue === 'undefined';
});

const checkboxIcon = computed<TCheckboxIcon>(() => {
  const model = props.modelValue;
  return indeterminateState.value
    ? constants.INDETERMINATE_ICON_NAME
    : model
    ? constants.CHECKED_ICON_NAME
    : constants.UNCHECKED_ICON_NAME;
});

const checkboxColor = computed<Undefinedable<TColor>>(() => {
  return props.modelValue && !props.disabled ? props.color : '';
});

const onCheckboxClicked = () => {
  if (!props.disabled && !props.readonly) {
    indeterminateState.value = false;
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
