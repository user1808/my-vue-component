<template>
  <li
    class="my-select-option grey-700"
    :class="{
      'my-bg-grey-50 my-black': active,
      'my-bg-grey-100 my-grey-800': selected,
    }"
    v-ripple.touchstart.mousedown="ripple"
  >
    <div
      class="my-select-option__text"
      :class="{
        'my-select-option__text--selected': selected,
      }"
    >
      <slot>
        <span>{{ itemTitle }}</span>
      </slot>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useRippleDirective } from '@/composables/useRippleDirective';
import type { TMySelectOptionProps } from './utils/my-select.types';

const { vRipple } = useRippleDirective();

defineProps<TMySelectOptionProps>();

defineSlots<{
  default(): any;
}>();
</script>

<style scoped lang="scss">
$font-size: calc(v-bind('$props.fontSize') * 1px);

@use './MySelectOption.scss' with (
  $font-size: $font-size
);
</style>
