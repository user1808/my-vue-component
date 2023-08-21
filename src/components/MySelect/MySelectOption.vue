<template>
  <li
    class="my-select-option grey-700"
    :class="{
      'my-bg-grey-50 my-black': active,
      'my-bg-grey-100 my-grey-800': selected,
    }"
  >
    <span
      class="my-select-option__text"
      :class="{
        'my-select-option__text--selected': selected,
      }"
      >{{ itemTitle }}</span
    >
  </li>
</template>

<script setup lang="ts">
import type { TMySelectOptionProps } from './utils/my-select.types';

defineProps<TMySelectOptionProps>();
</script>

<style scoped lang="scss">
$font-size: calc(v-bind('$props.fontSize') * 1px);

@use './MySelectOption.scss' with (
  $font-size: $font-size
);
</style>
