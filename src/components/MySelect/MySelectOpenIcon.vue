<template>
  <MyIcon
    icon-alt="chevron"
    icon-src="https://api.iconify.design/heroicons:chevron-down.svg"
    class="my-select-open-icon"
    :class="{
      'my-select-open-icon--open': open,
      'my-select-open-icon--disabled': disabled,
    }"
  />
</template>

<script setup lang="ts">
import MyIcon from '../MyIcon';
import type { TMySelectOpenIconProps } from './utils/my-select.types';

defineProps<TMySelectOpenIconProps>();
</script>

<style scoped lang="scss">
@use './MySelectOpenIcon.scss';
</style>
