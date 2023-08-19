<template>
  <li
    class="my-select-option"
    :class="{
      'my-select-option--active': active,
      'my-select-option--selected': selected,
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
