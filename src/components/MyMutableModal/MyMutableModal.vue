<template>
  <div>
    <div v-for="(modal, idx) in filteredModals" :key="idx">
      <MyModal
        v-bind="modal.props"
        :model-value="modelValue"
        :title="title"
        :color="color"
        :bg-color="bgColor"
        @update:model-value="emitModelValue"
      >
        <template #modal-title>
          <slot name="modal-title" />
        </template>
        <template #default>
          <slot />
        </template>
        <template #modal-footer>
          <slot name="modal-footer" />
        </template>
      </MyModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import MyModal from '../MyModal';

type TModalInstance = InstanceType<typeof MyModal>;
type TModalInstanceProps = TModalInstance['$props'];
type TModalInstanceSlots = TModalInstance['$slots'];

type TModelValue = TModalInstanceProps['modelValue'];
type TPassedModal = {
  props: Omit<
    TModalInstanceProps,
    'color' | 'bgColor' | 'title' | 'modelValue'
  >;
  fromWidth: number;
};

const props = defineProps<{
  modelValue: TModelValue;
  color?: TModalInstanceProps['color'];
  bgColor?: TModalInstanceProps['bgColor'];
  title?: TModalInstanceProps['title'];
  modals: Array<TPassedModal>;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: TModelValue];
}>();

defineSlots<TModalInstanceSlots>();

const emitModelValue = (newValue: TModelValue) => {
  emits('update:modelValue', newValue);
};

const modalsSorted = props.modals
  .map((modal) => modal)
  .sort((modal1, modal2) => modal1.fromWidth - modal2.fromWidth);

const getMediaMatches: (
  modal: TPassedModal,
  idx: number,
) => boolean = (modal, idx) => {
  const nextModal =
    idx + 1 === modalsSorted.length
      ? undefined
      : modalsSorted[idx + 1];
  const query = nextModal
    ? `(min-width: ${modal.fromWidth}px) and (max-width: ${nextModal?.fromWidth}px)`
    : `(min-width: ${modal.fromWidth}px)`;
  return window.matchMedia(query).matches;
};

const updateVisibility = () => {
  visibility.value = modalsSorted.map(getMediaMatches);
};

const visibility = ref<Array<boolean>>(
  modalsSorted.map(getMediaMatches),
);

const filteredModals = computed(() => {
  return modalsSorted.filter((_, idx) => visibility.value[idx]);
});

onMounted(() => {
  window.addEventListener('resize', updateVisibility);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateVisibility);
});
</script>

<style lang="scss"></style>
