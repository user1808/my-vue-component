<template>
  <div
    class="my-switch"
    :class="{ 'my-switch--disabled': disabled }"
    @click="onSwitchClicked"
  >
    <div
      class="my-switch__track"
      :class="[
        {
          'my-switch__track--disabled': disabled,
          'my-switch__track--inset': inset,
        },
        !isColorHex && color && modelValue ? `my-bg-${color}` : '',
      ]"
      :style="{
        backgroundColor: isColorHex && modelValue ? color : undefined,
      }"
    />
    <div
      class="my-switch-control"
      :class="{
        'my-switch-control--active': modelValue,
        'my-switch-control--indeterminate': indeterminateState,
      }"
      v-ripple:absolute.touchstart.mousedown="ripple && !disabled"
    >
      <input
        class="my-switch-control__input"
        :class="{ 'my-switch-control__input--disabled': disabled }"
        :value="!!modelValue"
        type="checkbox"
        :disabled="disabled"
      />
      <span
        class="my-switch-control__thumb"
        :class="{
          'my-switch-control__thumb--inset': inset,
          'my-switch-control__thumb--inset-active':
            inset && modelValue,
          'my-switch-control__thumb--disabled': disabled,
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
  modelValue: constants.DEFAULT_MODEL_VALUE,
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
