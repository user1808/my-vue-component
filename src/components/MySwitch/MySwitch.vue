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
import CONSTANTS from './constants/constants.script';
import type {
  TModelValue,
  TColor,
  TSize,
  TInset,
  TDisabled,
} from './types';

const props = withDefaults(
  defineProps<{
    modelValue: TModelValue;
    color?: TColor;
    height?: TSize;
    width?: TSize;
    inset?: TInset;
    disabled?: TDisabled;
  }>(),
  {
    height: CONSTANTS.DEFAULT_HEIGHT,
    width: CONSTANTS.DEFAULT_WIDTH,
    inset: CONSTANTS.DEFAULT_INSET,
  },
);

const computedHeight = computed<TSize>(() => {
  return props.inset
    ? Math.min(
        props.width * CONSTANTS.INSET_WIDTH_FACTOR,
        props.height,
      )
    : Math.min(
        props.width * CONSTANTS.STANDARD_WIDTH_FACTOR,
        props.height,
      );
});

const computedTrackColor = computed<TColor>(() => {
  return props.disabled
    ? CONSTANTS.DISABLED_COLOR
    : props.color || CONSTANTS.DEFAULT_TRACK_COLOR;
});

const computedThumbColor = computed<TColor>(() => {
  return props.modelValue
    ? props.color && props.disabled
      ? CONSTANTS.DISABLED_COLOR
      : props.color || CONSTANTS.DEFAULT_THUMB_COLOR
    : CONSTANTS.DEFAULT_THUMB_COLOR;
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
@use './constants/constants.style.scss' as *;

$thumbColor: v-bind('computedThumbColor');
$trackColor: v-bind('computedTrackColor');

$width: calc(v-bind('$props.width') * 1px);
$height: calc(v-bind('computedHeight') * 1px);

$thumbDiameter: calc($height * $thumbDiameterFactor);
$insetThumbDiameter: calc($height * $insetThumbDiameterFactor);
$transformShift: calc($thumbDiameter * $transformShiftFactor);

@use './MySwitch.scss' with (
  $thumbColor: $thumbColor,
  $trackColor: $trackColor,
  $width: $width,
  $height: $height,
  $thumbDiameter: $thumbDiameter,
  $insetThumbDiameter: $insetThumbDiameter,
  $transformShift: $transformShift
);
</style>
