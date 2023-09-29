<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog class="my-modal" as="div" @close="emitModelValue(false)">
      <TransitionChild
        as="template"
        enter="modal-background-transition-enter"
        enter-from="modal-background-transition-enter-from"
        enter-to="modal-background-transition-enter-to"
        leave="modal-background-transition-leave"
        leave-from="modal-background-transition-enter-to"
        leave-to="modal-background-transition-enter-from"
      >
        <div class="my-modal-background" />
      </TransitionChild>
      <div class="my-modal-content">
        <div class="my-modal-content-container">
          <TransitionChild
            as="template"
            enter="modal-dialog-transition-enter"
            enter-from="modal-dialog-transition-enter-from"
            enter-to="modal-dialog-transition-enter-to"
            leave="modal-dialog-transition-leave"
            leave-from="modal-dialog-transition-enter-to"
            leave-to="modal-dialog-transition-enter-from"
            @after-leave="emitModalClosed()"
            @after-enter="emitModalOpened()"
          >
            <DialogPanel
              class="my-modal-content-container-panel"
              :class="[
                {
                  'my-modal-content-container-panel--resizable':
                    resizable,
                },
                !isColorHex && color ? `my-${color}` : undefined,
                !isBgColorHex && bgColor
                  ? `my-bg-${color}`
                  : undefined,
              ]"
              :style="computedStyle"
            >
              <div
                v-if="!hideCloseIcon"
                class="my-modal-content-container-panel-close"
              >
                <MyButton
                  flat
                  class="my-modal-content-container-panel-close__btn"
                  @click="emitModelValue(false)"
                  :bg-color="bgColor"
                >
                  <MyIcon
                    library="heroicons"
                    name="x-mark"
                    :color="color"
                  />
                </MyButton>
              </div>
              <DialogTitle
                v-if="!hideTitle && (title || slots['modal-title'])"
                class="my-modal-content-container-panel__title"
              >
                <slot name="modal-title">
                  {{ title }}
                </slot>
              </DialogTitle>
              <div class="my-modal-content-container-panel__content">
                <slot />
              </div>
              <div>
                <slot name="modal-footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue';
import MyButton from '../MyButton';
import MyIcon from '../MyIcon';
import { computed, type StyleValue } from 'vue';
import { useColor } from '@/composables/useColor';
import type {
  TMyModalProps,
  TModelValue,
} from './utils/my-modal.types';
import constants from './utils/constants.script';

const { isHexColorValue } = useColor();

const props = withDefaults(defineProps<TMyModalProps>(), {
  hideTitle: constants.DEFAULT_HIDE_TITLE,
  resizable: constants.DEFAULT_RESIZABLE,
  stayOpened: constants.DEFAULT_STAY_OPENED,
});

const emits = defineEmits<{
  'update:modelValue': [value: TModelValue];
  modalClosed: [];
  modalOpened: [];
}>();

const slots = defineSlots<{
  default(): any;
  ['modal-title'](): any;
  ['modal-footer'](): any;
}>();

const emitModelValue = (newValue: TModelValue) => {
  if (!props.stayOpened) {
    emits('update:modelValue', newValue);
  }
};

const emitModalClosed = () => {
  emits('modalClosed');
};

const emitModalOpened = () => {
  emits('modalOpened');
};

const isColorHex = computed(() => isHexColorValue(props.color));
const isBgColorHex = computed(() => isHexColorValue(props.bgColor));

const computedStyle = computed<StyleValue>(() => {
  return {
    width: props.width ? `${props.width}px` : undefined,
    minWidth: props.minWidth ? `${props.minWidth}px` : undefined,
    maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
    height: props.height ? `${props.height}px` : undefined,
    minHeight: props.minHeight ? `${props.minHeight}px` : undefined,
    maxHeight: props.maxHeight ? `${props.maxHeight}px` : undefined,
    backgroundColor: isBgColorHex.value ? props.bgColor : undefined,
    color: isColorHex.value ? props.color : undefined,
  };
});
</script>

<style scoped lang="scss">
@use './MyModal.scss';
</style>
