<template>
  <button
    v-ripple="ripple && !disabled"
    v-ripple.touchstart="ripple && !disabled"
    class="my-btn"
    :class="[
      {
        'my-btn--flat': flat,
        'my-btn--disable-hover-color': withoutHoverColor,
        'my-btn--outlined': outlined,
        'my-btn--disabled': disabled,
      },
      !isBgColorHex && bgColor ? `my-bg-${bgColor}` : '',
      !isColorHex && color ? `my-${color}` : '',
    ]"
    :style="{
      backgroundColor: isBgColorHex ? bgColor : undefined,
      color: isColorHex ? color : undefined,
    }"
  >
    <span :class="{ 'my-btn__content--hover': contentHoverOpacity }">
      <slot> Button </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { TMyButtonProps } from './utils/my-button.types';
import constants from './utils/constants.script';
import { useColor } from '@/composables/useColor';
import { useRippleDirective } from '@/composables/useRippleDirective';

const { isHexColorValue } = useColor();
const { vRipple } = useRippleDirective();

const props = withDefaults(defineProps<TMyButtonProps>(), {
  flat: constants.DEFAULT_FLAT,
  withoutHoverColor: constants.DEFAULT_WITHOUT_HOVER_COLOR,
  contentHoverOpacity: constants.DEFAULT_CONTENT_HOVER_OPACITY,
  outlined: constants.DEFAULT_OUTLINED,
  ripple: constants.DEFAULT_RIPPLE,
  disabled: constants.DEFAULT_DISABLED,
});

const isBgColorHex = computed(() => isHexColorValue(props.bgColor));
const isColorHex = computed(() => isHexColorValue(props.color));
</script>

<style scoped lang="scss">
@use './MyButton.scss';
</style>