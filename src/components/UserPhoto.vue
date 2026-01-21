<template>
  <label class="user-photo-wrapper">
    <input type="file" @change="uploadPhoto" accept="image/*" class="user-photo-wrapper__input" />
    <img
      :src="props.modelValue || NoAvatarImage"
      alt="Фото пользователя"
      class="user-photo-wrapper__img"
    />
    <img
      :src="props.modelValue ? EditPhotoImage : AddPhotoImage"
      alt="icon for adding photo"
      class="user-photo-wrapper__icon"
      width="64"
      height="64"
    />
  </label>
</template>

<script setup lang="ts">
  import NoAvatarImage from '@/assets/images/no-avatar.jpg';
  import AddPhotoImage from '@/assets/images/add-photo.png';
  import EditPhotoImage from '@/assets/images/edit-photo.png';
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: String, // путь к фото
  });

  const emit = defineEmits(['update:modelValue']);

  const photo = ref(props.modelValue);

  watch(photo, (val) => {
    emit('update:modelValue', val);
  });

  const uploadPhoto = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      photo.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };
</script>

<style scoped lang="scss">
  .user-photo-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 120px;
    height: 120px;
    &__input {
      display: none;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: 0.3s ease;
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      border-radius: 50%;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      height: 100%;
      background-color: rgb(255, 255, 255);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    &:hover:before {
      opacity: 0.4;
    }
    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 2;
    }

    &:hover &__icon {
      opacity: 1;
    }
  }
</style>
