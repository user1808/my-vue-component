<template>
  <div class="my-icon">
    <img :src="iconSrc" :alt="iconAlt" class="my-icon__img" />
  </div>
</template>

<script setup lang="ts">
import type { TMyIconProps } from './utils/my-icon.types';

defineProps<TMyIconProps>();
</script>

<style scoped lang="scss">
@use './MyIcon.scss';
</style>
