<template>
  <div>TEST</div>
  <MySwitch v-model="value" />
  {{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MySwitch from './components/MySwitch.vue';

const value = ref<boolean>(true);
</script>
