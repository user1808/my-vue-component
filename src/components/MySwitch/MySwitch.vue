<template>
  <div
    class="switch"
    :class="{ 'switch--disabled': disabled }"
    @click="onSwitchClicked"
  >
    <div
      class="switch__track"
      :class="{
        'switch__track--active': modelValue && color,
        'switch__track--disabled': disabled,
      }"
    />
    <div
      class="switch-control"
      :class="{ 'switch-control--active': modelValue }"
    >
      <input
        class="switch-control__input"
        :value="modelValue"
        type="checkbox"
        :disabled="disabled"
      />
      <span
        class="switch-control__thumb"
        :class="{
          'switch-control__thumb--active': modelValue && color,
          'switch-control__thumb--inset': inset,
          'switch-control__thumb--disabled': disabled,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import constants from './utils/constants.script';
import type {
  TMySwitchProps,
  TColor,
  TModelValue,
  TSize,
} from './utils/my-switch.types';

const props = withDefaults(defineProps<TMySwitchProps>(), {
  height: constants.DEFAULT_HEIGHT,
  width: constants.DEFAULT_WIDTH,
  inset: constants.DEFAULT_INSET,
});

const computedWidth = computed<TSize>(() => {
  return props.inset ? constants.DEFAULT_INSET_WIDTH : props.width;
});

const computedHeight = computed<TSize>(() => {
  return props.inset ? constants.DEFAULT_INSET_HEIGHT : props.height;
});

const computedTrackColor = computed<TColor>(() => {
  return props.disabled
    ? constants.DISABLED_COLOR
    : props.color || constants.DEFAULT_TRACK_COLOR;
});

const computedThumbColor = computed<TColor>(() => {
  return props.modelValue
    ? props.color && props.disabled
      ? constants.DISABLED_COLOR
      : props.color || constants.DEFAULT_THUMB_COLOR
    : constants.DEFAULT_THUMB_COLOR;
});

const emits = defineEmits<{
  'update:modelValue': [value: TModelValue];
}>();

const onSwitchClicked = () => {
  if (!props.disabled) {
    emits('update:modelValue', !props.modelValue);
  }
};
</script>

<style scoped lang="scss">
$thumb-color: v-bind('computedThumbColor');
$track-color: v-bind('computedTrackColor');
$width: calc(v-bind('computedWidth') * 1px);
$height: calc(v-bind('computedHeight') * 1px);

@use './MySwitch.scss' with (
  $thumb-color: $thumb-color,
  $track-color: $track-color,
  $width: $width,
  $height: $height
);
</style>
