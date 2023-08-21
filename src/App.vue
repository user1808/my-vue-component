<template>
  <div>
    <MySwitch v-model="switchValue" color="blue-700" />
  </div>
  <div>
    <MySelect
      v-model="selectedItem"
      :items="selectItems"
      :options-font-size="selectSize"
      clearable
    />
    {{ selectedItem }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MySwitch from './components/MySwitch';
import MySelect from './components/MySelect';

const switchValue = ref<boolean>(true);

const selectItems = [11111, 222222, 3333333, 444444, 555555, 6666666];
const selectSize = ref(23);
const selectedItem = ref(selectItems[3]);
</script>
