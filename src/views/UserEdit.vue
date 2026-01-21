<template>
  <div class="user-list">
    <Filter v-model="filterAdult" />
    <div class="user-list__controls">
      <button class="user-list__button" @click="sortBy('name')">Сортировать по имени</button>
      <button class="user-list__button" @click="sortBy('age')">Сортировать по возрасту</button>
    </div>
    <div class="user-list__items">
      <UserItem v-for="user in filteredUsers" :key="user.id" :user="user" @update="updateUser" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import UserItem from '@/components/UserItem.vue';
  import Filter from '@/components/FiltersBar.vue';

  const users = ref([]);
  const filterAdult = ref(false);
  const sortKey = ref('');

  // Computed: фильтрованный и отсортированный список
  const filteredUsers = computed(() => {
    let list = [...users.value];
    if (filterAdult.value) {
      list = list.filter((u) => u.age > 18);
    }
    if (sortKey.value === 'name') {
      list.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortKey.value === 'age') {
      list.sort((a, b) => a.age - b.age);
    }
    return list;
  });

  // Хук onMounted: загрузка из localStorage
  onMounted(() => {
    const stored = localStorage.getItem('useцs');
    if (stored) users.value = JSON.parse(stored);
    else {
      // Начальные данные
      users.value = [
        {
          id: 1,
          firstName: 'Иван',
          lastName: 'Иванов',
          age: 25,
          email: 'ivan@example.com',
          photo: '',
        },
        {
          id: 2,
          firstName: 'Мария',
          lastName: 'Петрова',
          age: 17,
          email: 'maria@example.com',
          photo: '',
        },
        {
          id: 3,
          firstName: 'Алексей',
          lastName: 'Сидоров',
          age: 30,
          email: 'alex@example.com',
          photo: '',
        },
        {
          id: 4,
          firstName: 'Алексей',
          lastName: 'Сидоров',
          age: 30,
          email: 'alex@example.com',
          photo: '',
        },
        {
          id: 5,
          firstName: 'Алеавыксей',
          lastName: 'Сидоров',
          age: 30,
          email: 'alex@example.com',
          photo: '',
        },
        {
          id: 6,
          firstName: 'Алексей',
          lastName: 'Сидоров',
          age: 30,
          email: 'alex@example.com',
          photo: '',
        },
        {
          id: 7,
          firstName: 'Алексей',
          lastName: 'Сидоров',
          age: 30,
          email: 'alex@example.com',
          photo: '',
        },
      ];
    }
  });

  // Watch: сохранение в localStorage при изменениях
  watch(
    users,
    (newVal) => {
      localStorage.setItem('users', JSON.stringify(newVal));
    },
    { deep: true },
  );

  // Функции
  const updateUser = (updated) => {
    const index = users.value.findIndex((u) => u.id === updated.id);
    if (index !== -1) users.value[index] = updated;
  };

  const sortBy = (key) => {
    sortKey.value = key;
  };
</script>

<style lang="scss">
  .user-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .user-list__controls {
    display: flex;
    gap: 10px;
  }

  .user-list__button {
    padding: 10px 20px;
    background-color: var(--color-accent);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .user-list__button:hover {
    background-color: var(--color-accent);
    transform: scale(1.05);
  }

  .user-list__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .user-list__controls {
      flex-direction: column;
      gap: 10px;
    }
    .user-list__items {
      grid-template-columns: 1fr;
    }
  }
</style>
