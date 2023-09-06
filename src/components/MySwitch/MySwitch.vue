<template>
  <div
    class="switch"
    :class="{ 'switch--disabled': disabled }"
    @click="onSwitchClicked"
  >
    <div
      class="switch__track"
      :class="[
        {
          'switch__track--disabled': disabled,
          'switch__track--inset': inset,
        },
        !isColorHex && color && modelValue ? `my-bg-${color}` : '',
      ]"
      :style="{
        backgroundColor: isColorHex && modelValue ? color : undefined,
      }"
    />
    <div
      class="switch-control"
      :class="{
        'switch-control--active': modelValue,
        'switch-control--indeterminate': indeterminateState,
      }"
      v-ripple:absolute="ripple && !disabled"
      v-ripple:absolute.touchstart="ripple && !disabled"
    >
      <input
        class="switch-control__input"
        :class="{ 'switch-control__input--disabled': disabled }"
        :value="!!modelValue"
        type="checkbox"
        :disabled="disabled"
      />
      <span
        class="switch-control__thumb"
        :class="{
          'switch-control__thumb--inset': inset,
          'switch-control__thumb--inset-active': inset && modelValue,
          'switch-control__thumb--disabled': disabled,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColor } from '@/composables/useColor';
import constants from './utils/constants.script';
import type {
  TMySwitchProps,
  TModelValue,
  TIndeterminate,
} from './utils/my-switch.types';
import { computed, ref, watchEffect } from 'vue';
import { useRippleDirective } from '@/composables/useRippleDirective';

const { isHexColorValue } = useColor();
const { vRipple } = useRippleDirective();

const props = withDefaults(defineProps<TMySwitchProps>(), {
  indeterminate: constants.DEFAULT_INDETERMINATE,
  disabled: constants.DEFAULT_DISABLED,
  readonly: constants.DEFAULT_READONLY,
  inset: constants.DEFAULT_INSET,
  ripple: constants.DEFAULT_RIPPLE,
});

const emits = defineEmits<{
  'update:modelValue': [value: TModelValue];
}>();

const indeterminateState = ref<TIndeterminate>(
  props.indeterminate && typeof props.modelValue === 'undefined',
);
watchEffect(() => {
  indeterminateState.value =
    props.indeterminate && typeof props.modelValue === 'undefined';
});

const isColorHex = computed(() => isHexColorValue(props.color));

const onSwitchClicked = () => {
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
@use './MySwitch.scss';
</style>
