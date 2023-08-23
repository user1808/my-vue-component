<template>
  <div class="my-icon">
    <img
      class="my-icon__icon"
      :src="`https://api.iconify.design/${library}:${name}.svg${iconColor}`"
      :alt="name"
    />
  </div>
</template>

<script setup lang="ts">
import { useColor } from '@/composables/useColor';
import type { TMyIconProps, TColor } from './utils/my-icon.types';
import { computed } from 'vue';
import { colors } from '@/assets/colors/colors';
import constants from './utils/constants.script';

const props = withDefaults(defineProps<TMyIconProps>(), {
  library: constants.DEFAULT_LIBRARY,
});

const { isHexColorValue } = useColor();

const iconColor = computed(() => {
  if (props.color) {
    if (isHexColorValue(props.color)) {
      return `?color=%23${removeHash(props.color)}`;
    } else if (props.color in colors) {
      return `?color=%23${removeHash(colors[props.color])}`;
    }
  }
  return '';
});

const removeHash = (value: TColor): TColor => {
  return value.slice(1);
};
</script>

<style scoped lang="scss">
@use './MyIcon.scss';
</style>
