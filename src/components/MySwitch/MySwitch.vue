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
          'switch__track--colorize-disabled': disabled,
          'switch__track--inset': inset,
        },
        !isColorHex && color && modelValue ? `bg-${color}` : '',
      ]"
      :style="{
        backgroundColor: isColorHex && modelValue ? color : undefined,
      }"
    />
    <div class="switch-control">
      <input
        class="switch-control__input"
        :value="modelValue"
        type="checkbox"
        :disabled="disabled"
      />
      <span
        class="switch-control__thumb"
        :class="{
          'switch-control__thumb--active': modelValue,
          'switch-control__thumb--inset': inset,
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
} from './utils/my-switch.types';
import { computed } from 'vue';

const { isHexColorValue } = useColor();

const props = withDefaults(defineProps<TMySwitchProps>(), {
  inset: constants.DEFAULT_INSET,
});

const emits = defineEmits<{
  'update:modelValue': [value: TModelValue];
}>();

const isColorHex = computed(() => isHexColorValue(props.color));

const onSwitchClicked = () => {
  if (!props.disabled) {
    emits('update:modelValue', !props.modelValue);
  }
};
</script>

<style scoped lang="scss">
@use './MySwitch.scss';
</style>
