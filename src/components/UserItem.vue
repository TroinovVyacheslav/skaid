<template>
  <div class="user-item" :class="{ 'user-item--adult': user.age > 18 }">
    <div class="user-item__header">
      <UserPhoto v-model="localUser.photo" />
    </div>
    <div class="user-item__info ellipsis">
      <p class="user-item__name" v-tooltip="localUser.firstName + localUser.lastName">
        {{ localUser.firstName }} {{ localUser.lastName }}
      </p>
      <p>Возраст: {{ localUser.age }}</p>
      <p style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
        <a
          :href="`mailto:${localUser.email}`"
          class="user-item__email tooltip"
          v-tooltip="localUser.email"
          >{{ localUser.email }}</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import UserPhoto from '@/components/UserPhoto.vue';

  const props = defineProps({ user: Object });
  const emit = defineEmits(['update']);

  const localUser = ref({ ...props.user });

  // Watch: эмитим изменения
  watch(
    localUser,
    (newVal) => {
      emit('update', { ...newVal });
    },
    { deep: true },
  );
</script>

<style lang="scss">
  .user-item {
    max-width: 350px;

    background: linear-gradient(
      0deg,
      rgba(177, 175, 162, 1) 0%,
      rgba(177, 175, 162, 1) 70%,
      rgba(132, 130, 116, 1) 70%,
      rgba(132, 130, 116, 1) 100%
    );
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .user-item__header {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px;
    border-radius: 50%;
    background: rgba(177, 175, 162, 1);
    transition:
      padding 0.5s,
      background-color 0.5s;
    &:hover {
      padding: 0 0 18px 0;
      background: transparent;
    }
  }

  .user-item__info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;
  }

  .user-item__name {
    font-size: 1.2em;
    font-weight: bold;
    //color: var(--color-accent);
  }

  .user-item__upload-label {
    padding: 8px 16px;
    background-color: var(--color-accent);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .user-item__upload-label:hover {
    background-color: var(--color-accent);
  }

  .user-item__upload {
    display: none; /* Скрываем стандартный input */
  }

  .user-item--adult .user-item__name {
    /* Модификатор для выделения */
    //color: #2196F3; /* Синий для взрослых */
  }

  @media (max-width: 768px) {
    .user-item {
      padding: 15px;
    }
  }

  .user-item__email {
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  .user-item__email:hover {
    color: var(--color-text-primary);
    text-decoration: underline;
  }
</style>
