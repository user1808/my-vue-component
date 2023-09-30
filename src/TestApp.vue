<template>
  <div>
    <MyButton @click="updateModalValue"> Modal </MyButton>
    <MyModal
      v-model="modal"
      :hide-title="false"
      resizable
      hide-close-icon
      bottom-type-scrollable
      type="bottom"
      title="Test"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt at
      totam numquam. Voluptatibus sequi tempora in! Cumque voluptas
      dolore voluptatum vel, perferendis debitis aut, aliquam tempora
      repellat, incidunt ducimus quis? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Repudiandae, a tempore pariatur
      ducimus accusantium sed sequi eum porro delectus magni illum
      eius, sunt ex fugiat? Impedit neque nihil autem expedita. Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Vel dicta
      iusto eius dolor laudantium iure ab maxime officia repudiandae
      eveniet cumque quas dignissimos, amet corrupti exercitationem
      soluta omnis? A, repudiandae. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Illo adipisci aliquid consequuntur
      reiciendis. Voluptatum qui possimus eveniet quaerat blanditiis,
      obcaecati omnis quia accusamus iusto ea, ipsum, iste sunt illo
      illum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Vel pariatur natus, nulla et perferendis labore accusantium,
      nemo ex quasi quia quas, explicabo at nam qui cupiditate sunt
      error doloremque cumque? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Omnis illo eveniet magnam corporis blanditiis
      saepe totam mollitia, praesentium laboriosam sunt cupiditate
      explicabo ipsam eum doloremque suscipit animi dignissimos sed
      hic? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Adipisci iure ipsam explicabo sed ratione! Quaerat perferendis,
      aliquid officiis molestias, nihil dicta laboriosam quis, a
      eveniet omnis magnam assumenda quod expedita! ducimus
      accusantium sed sequi eum porro delectus magni illum eius, sunt
      ex fugiat? Impedit neque nihil autem expedita. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Vel dicta iusto eius
      dolor laudantium iure ab maxime officia repudiandae eveniet
      cumque quas dignissimos, amet corrupti exercitationem soluta
      omnis? A, repudiandae. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Illo adipisci aliquid consequuntur reiciendis.
      Voluptatum qui possimus eveniet quaerat blanditiis, obcaecati
      omnis quia accusamus iusto ea, ipsum, iste sunt illo illum?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
      pariatur natus, nulla et perferendis labore accusantium, nemo ex
      quasi quia quas, explicabo at nam qui cupiditate sunt error
      doloremque cumque? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Omnis illo eveniet magnam corporis blanditiis
      saepe totam mollitia, praesentium laboriosam sunt cupiditate
      explicabo ipsam eum doloremque suscipit animi dignissimos sed
      hic? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Adipisci iure ipsam explicabo sed ratione! Quaerat perferendis,
      aliquid officiis molestias, nihil dicta laboriosam quis, a
      eveniet omnis magnam assumenda quod expedita! ducimus
      accusantium sed sequi eum porro delectus magni illum eius, sunt
      ex fugiat? Impedit neque nihil autem expedita. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Vel dicta iusto eius
      dolor laudantium iure ab maxime officia repudiandae eveniet
      cumque quas dignissimos, amet corrupti exercitationem soluta
      omnis? A, repudiandae. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Illo adipisci aliquid consequuntur reiciendis.
      Voluptatum qui possimus eveniet quaerat blanditiis, obcaecati
      omnis quia accusamus iusto ea, ipsum, iste sunt illo illum?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
      pariatur natus, nulla et perferendis labore accusantium, nemo ex
      quasi quia quas, explicabo at nam qui cupiditate sunt error
      doloremque cumque? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Omnis illo eveniet magnam corporis blanditiis
      saepe totam mollitia, praesentium laboriosam sunt cupiditate
      explicabo ipsam eum doloremque suscipit animi dignissimos sed
      hic? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Adipisci iure ipsam explicabo sed ratione! Quaerat perferendis,
      aliquid officiis molestias, nihil dicta laboriosam quis, a
      eveniet omnis magnam assumenda quod expedita!
      <template #modal-footer> Footer </template>
    </MyModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyButton from './components/MyButton/MyButton.vue';
import MyModal from './components/MyModal/MyModal.vue';

const modal = ref(false);

const updateModalValue = () => {
  modal.value = !modal.value;
};
</script>
