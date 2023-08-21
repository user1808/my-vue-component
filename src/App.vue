<template>
  <div>
    <MySelect
      v-model="selectedItem"
      :items="selectItems"
      :options-font-size="selectSize"
      clearable
    />
  </div>
  <div>
    <MySwitch v-model="switchValue" color="blue-700" />
  </div>
  <div>
    <MyCheckbox v-model="checkboxValue" color="#fa1" />
  </div>
  <div>
    <MyIcon library="solar" name="4k-outline" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MySwitch from './components/MySwitch';
import MySelect from './components/MySelect';
import MyCheckbox from './components/MyCheckbox';
import MyIcon from './components/MyIcon';

const switchValue = ref<boolean>(false);
const checkboxValue = ref(false);

const selectItems = [11111, 222222, 3333333, 444444, 555555, 6666666];
const selectSize = ref(23);
const selectedItem = ref(selectItems[3]);
</script>
