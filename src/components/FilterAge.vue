<template>
  <div class="dropdown">
    <div class="">Dropdown</div>
    <div class="dropdown-content">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </div>
  </div>
  <div class="age-filter">
    <select v-model="operator" class="age-filter__select">
      <option value=">">больше</option>
      <option value="<">меньше</option>
      <option value="=">равно</option>
      <option value=">=">больше или равно</option>
      <option value="<=">меньше или равно</option>
    </select>

    <input
      v-model.number="value"
      type="number"
      min="0"
      placeholder="Возраст"
      class="age-filter__input"
    />
  </div>
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue';
  import { useVModel } from '@/composables';
  const props = defineProps<{
    modelValue?: ageFilter;
  }>();
  const localModelValue = useVModel('modelValue', props);
  const operator = ref('>');
  const value = ref(null);

  const emit = defineEmits(['update']);

  watch([operator, value], () => {
    emit('update', { operator: operator.value, value: value.value });
  });
</script>

<style scoped lang="scss">
  .age-filter {
    display: flex;
    gap: 8px;
  }

  .age-filter__select,
  .age-filter__input {
    min-height: 40px;
    min-width: 100px;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    color: black;
    background: white;
  }
  /* Dropdown Menu */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    min-width: 160px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s;
    pointer-events: none;
    border-radius: 0.5rem;
  }

  .dropdown:hover .dropdown-content {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .dropdown-content a {
    color: #374151;
    padding: 0.5rem 1rem;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background: #f3f4f6;
  }
</style>
