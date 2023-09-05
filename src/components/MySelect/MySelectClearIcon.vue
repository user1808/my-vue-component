<template>
  <MyIcon
    v-if="clearable"
    v-show="!disabled"
    name="cancel"
    class="my-select-clear-icon"
    :class="{
      'my-select-clear-icon--placed': isItemSelected,
      'my-select-clear-icon--visible': open,
    }"
    @click.stop="clearSelect"
  />
</template>

<script setup lang="ts">
import MyIcon from '../MyIcon';
import type { TMySelectClearIconProps } from './utils/my-select.types';

defineProps<TMySelectClearIconProps>();

const emits = defineEmits<{
  clear: [];
}>();

const clearSelect = () => {
  emits('clear');
};
</script>

<style scoped lang="scss">
@use './MySelectClearIcon.scss';
</style>
