<template>
  <div>TEST</div>
  <MySwitch v-model="value" color="red" />
  {{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MySwitch from './components/MySwitch';

const value = ref<boolean>(true);
</script>
