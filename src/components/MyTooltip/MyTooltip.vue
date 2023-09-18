<template>
  <div class="tooltip">
    <slot />
    <div
      class="tooltip-box"
      :class="[
        {
          'tooltip-box--hide-arrow': hideArrow,
          'tooltip-box--always-show': alwaysShow,
          'tooltip-box--disabled': disabled,
        },
        `tooltip-box--primary-${primaryPosition}`,
        `tooltip-box--secondary-${secondaryPosition}`,
      ]"
    >
      <div
        class="tooltip-box-content"
        :style="computedTooltipContentStyle"
      >
        <slot name="tooltip-content">
          <span class="tooltip-box-content__default-text">
            {{ text }}
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import type {
  TMyTooltipProps,
  TTooltipSizes,
} from './utils/my-tooltip.types';
import constants from './utils/constants.script';

const props = withDefaults(defineProps<TMyTooltipProps>(), {
  primaryPosition: constants.DEFAULT_PRIMARY_POSITION,
  secondaryPosition: constants.DEFAULT_SECONDARY_POSITION,
  hideArrow: constants.DEFAULT_HIDE_ARROW,
  alwaysShow: constants.DEFAULT_ALWAYS_SHOW,
  disabled: constants.DEFAULT_DISABLED,
});

const computedTooltipContentStyle = computed<StyleValue>(() => {
  return {
    maxHeight: convertSizeProp(props.maxHeight),
    maxWidth: convertSizeProp(props.maxWidth),
    width: convertSizeProp(props.width),
    height: convertSizeProp(props.height),
  };
});

const convertSizeProp = (prop: Undefinedable<TTooltipSizes>) => {
  return typeof prop === 'number' ? `${prop}px` : prop;
};
</script>

<style scoped lang="scss">
@use './MyTooltip.scss';
</style>
