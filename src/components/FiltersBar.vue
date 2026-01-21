<template>
  <label class="filter">
    <FilterAge v-model="filters.ageFilter" />
  </label>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import FilterAge from '@/components/FilterAge.vue';

  interface IFilters {
    search?: string;
    ageFilter?: FilterValueNumber;
  }
  const props = defineProps<{
    modelValue?: IFilters;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: IFilters];
  }>();

  const filters = ref<IFilters>(props.modelValue || {});

  watch(
    filters,
    (newVal) => {
      emit('update:modelValue', newVal);
    },
    { deep: true }, // важно для объектов!
  );

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal) {
        filters.value = { ...newVal };
      }
    },
  );
</script>

<style lang="scss">
  .filter {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1em;
    cursor: pointer;
  }

  .filter input {
    width: 20px;
    height: 20px;
    accent-color: white;
    color: white;
  }
</style>
