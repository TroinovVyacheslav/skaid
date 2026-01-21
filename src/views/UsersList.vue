<template>
  <div class="user-list">
    <div class="user-list__toolbar">
      <FiltersBar v-model="filterOptions" />
      <div class="user-list__controls">
        <button class="user-list__button" @click="sortBy('name')">Сортировать по имени</button>
        <button class="user-list__button" @click="sortBy('age')">Сортировать по возрасту</button>
      </div>
    </div>
    <AnimatedDivider />

    <transition-group name="list" tag="div" class="user-list__items">
      <UserItem v-for="user in filteredUsers" :key="user.id" :user="user" @update="updateUser" />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import UserItem from '@/components/UserItem.vue';
  import FiltersBar from '@/components/FiltersBar.vue';
  import AnimatedDivider from '@/UI/AnimatedDivider.vue';

  const users = ref([]);
  const filterAdult = ref(false);
  const sortKey = ref('');
  const filterOptions = ref<IFilters | undefined>();
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

  onMounted(() => {
    const stored = localStorage.getItem('users');
    if (stored) users.value = JSON.parse(stored);
    else {
      // Начальные данные
      users.value = [
        {
          id: 1,
          firstName: 'Иван',
          lastName: 'Иванов',
          age: 25,
          email: 'ivanivanov1@example.com',
          photo: '',
        },
        {
          id: 2,
          firstName: 'Мария',
          lastName: 'Петрова',
          age: 17,
          email: 'mariapetrova2@example.com',
          photo: '',
        },
        {
          id: 3,
          firstName: 'Алексей',
          lastName: 'Сидоров',
          age: 30,
          email: 'alekseysidorov3@example.com',
          photo: '',
        },
        {
          id: 4,
          firstName: 'Анна',
          lastName: 'Кузнецова',
          age: 22,
          email: 'annakuznetsova4@example.com',
          photo: '',
        },
        {
          id: 5,
          firstName: 'Сергей',
          lastName: 'Смирнов',
          age: 40,
          email: 'sergeysmirnov5@example.com',
          photo: '',
        },
        {
          id: 6,
          firstName: 'Екатерина',
          lastName: 'Попова',
          age: 29,
          email: 'ekaterinapopova6@example.com',
          photo: '',
        },
        {
          id: 7,
          firstName: 'Дмитрий',
          lastName: 'Лебедев',
          age: 33,
          email: 'dmitrylebedev7@example.com',
          photo: '',
        },
        {
          id: 8,
          firstName: 'Ольга',
          lastName: 'Козлова',
          age: 19,
          email: 'olgakozlova8@example.com',
          photo: '',
        },
        {
          id: 9,
          firstName: 'Никита',
          lastName: 'Новиков',
          age: 45,
          email: 'nikitanovikov9@example.com',
          photo: '',
        },
        {
          id: 10,
          firstName: 'Татьяна',
          lastName: 'Морозова',
          age: 27,
          email: 'tatyanamorozova10@example.com',
          photo: '',
        },
        {
          id: 11,
          firstName: 'Иван',
          lastName: 'Кузнецов',
          age: 36,
          email: 'ivankuznetsov11@example.com',
          photo: '',
        },
        {
          id: 12,
          firstName: 'Мария',
          lastName: 'Смирнова',
          age: 21,
          email: 'mariasmirnova12@example.com',
          photo: '',
        },
        {
          id: 13,
          firstName: 'Алексей',
          lastName: 'Попов',
          age: 38,
          email: 'alekseypopov13@example.com',
          photo: '',
        },
        {
          id: 14,
          firstName: 'Анна',
          lastName: 'Лебедева',
          age: 31,
          email: 'annalebedeva14@example.com',
          photo: '',
        },
        {
          id: 15,
          firstName: 'Сергей',
          lastName: 'Козлов',
          age: 24,
          email: 'sergeykozlov15@example.com',
          photo: '',
        },
        {
          id: 16,
          firstName: 'Екатерина',
          lastName: 'Новикова',
          age: 50,
          email: 'ekaterinanovikova16@example.com',
          photo: '',
        },
        {
          id: 17,
          firstName: 'Дмитрий',
          lastName: 'Морозов',
          age: 42,
          email: 'dmitrymorozov17@example.com',
          photo: '',
        },
        {
          id: 18,
          firstName: 'Ольга',
          lastName: 'Иванова',
          age: 23,
          email: 'olgaivanova18@example.com',
          photo: '',
        },
        {
          id: 19,
          firstName: 'Никита',
          lastName: 'Петров',
          age: 28,
          email: 'nikitapetrov19@example.com',
          photo: '',
        },
        {
          id: 20,
          firstName: 'Татьяна',
          lastName: 'Сидорова',
          age: 35,
          email: 'tatyanasidorova20@example.com',
          photo: '',
        },
        {
          id: 21,
          firstName: 'Иван',
          lastName: 'Лебедев',
          age: 20,
          email: 'ivanlebedev21@example.com',
          photo: '',
        },
        {
          id: 22,
          firstName: 'Мария',
          lastName: 'Козлова',
          age: 26,
          email: 'mariakozlova22@example.com',
          photo: '',
        },
        {
          id: 23,
          firstName: 'Алексей',
          lastName: 'Новиков',
          age: 31,
          email: 'alekseynovikov23@example.com',
          photo: '',
        },
        {
          id: 24,
          firstName: 'Анна',
          lastName: 'Морозова',
          age: 33,
          email: 'annamorozova24@example.com',
          photo: '',
        },
        {
          id: 25,
          firstName: 'Сергей',
          lastName: 'Иванов',
          age: 29,
          email: 'sergeyivanov25@example.com',
          photo: '',
        },
        {
          id: 26,
          firstName: 'Екатерина',
          lastName: 'Петрова',
          age: 37,
          email: 'ekaterinapetrova26@example.com',
          photo: '',
        },
        {
          id: 27,
          firstName: 'Дмитрий',
          lastName: 'Сидоров',
          age: 41,
          email: 'dmitrysidorov27@example.com',
          photo: '',
        },
        {
          id: 28,
          firstName: 'Ольга',
          lastName: 'Кузнецова',
          age: 34,
          email: 'olgakuznetsova28@example.com',
          photo: '',
        },
        {
          id: 29,
          firstName: 'Никита',
          lastName: 'Смирнов',
          age: 22,
          email: 'nikitasmirnov29@example.com',
          photo: '',
        },
        {
          id: 30,
          firstName: 'Татьяна',
          lastName: 'Попова',
          age: 30,
          email: 'tatyanapopova30@example.com',
          photo: '',
        },
        {
          id: 31,
          firstName: 'Иван',
          lastName: 'Лебедев',
          age: 19,
          email: 'ivanlebedev31@example.com',
          photo: '',
        },
        {
          id: 32,
          firstName: 'Мария',
          lastName: 'Козлова',
          age: 27,
          email: 'mariakozlova32@example.com',
          photo: '',
        },
        {
          id: 33,
          firstName: 'Алексей',
          lastName: 'Новиков',
          age: 44,
          email: 'alekseynovikov33@example.com',
          photo: '',
        },
        {
          id: 34,
          firstName: 'Анна',
          lastName: 'Морозова',
          age: 21,
          email: 'annamorozova34@example.com',
          photo: '',
        },
        {
          id: 35,
          firstName: 'Сергей',
          lastName: 'Иванов',
          age: 39,
          email: 'sergeyivanov35@example.com',
          photo: '',
        },
        {
          id: 36,
          firstName: 'Екатерина',
          lastName: 'Петрова',
          age: 25,
          email: 'ekaterinapetrova36@example.com',
          photo: '',
        },
        {
          id: 37,
          firstName: 'Дмитрий',
          lastName: 'Сидоров',
          age: 32,
          email: 'dmitrysidorov37@example.com',
          photo: '',
        },
        {
          id: 38,
          firstName: 'Ольга',
          lastName: 'Кузнецова',
          age: 18,
          email: 'olgakuznetsova38@example.com',
          photo: '',
        },
        {
          id: 39,
          firstName: 'Никита',
          lastName: 'Смирнов',
          age: 23,
          email: 'nikitasmirnov39@example.com',
          photo: '',
        },
        {
          id: 40,
          firstName: 'Татьяна',
          lastName: 'Попова',
          age: 36,
          email: 'tatyanapopova40@example.com',
          photo: '',
        },
        {
          id: 41,
          firstName: 'Иван',
          lastName: 'Лебедев',
          age: 30,
          email: 'ivanlebedev41@example.com',
          photo: '',
        },
        {
          id: 42,
          firstName: 'Мария',
          lastName: 'Козлова',
          age: 26,
          email: 'mariakozlova42@example.com',
          photo: '',
        },
        {
          id: 43,
          firstName: 'Алексей',
          lastName: 'Новиков',
          age: 35,
          email: 'alekseynovikov43@example.com',
          photo: '',
        },
        {
          id: 44,
          firstName: 'Анна',
          lastName: 'Морозова',
          age: 29,
          email: 'annamorozova44@example.com',
          photo: '',
        },
        {
          id: 45,
          firstName: 'Сергей',
          lastName: 'Иванов',
          age: 33,
          email: 'sergeyivanov45@example.com',
          photo: '',
        },
        {
          id: 46,
          firstName: 'Екатерина',
          lastName: 'Петрова',
          age: 40,
          email: 'ekaterinapetrova46@example.com',
          photo: '',
        },
        {
          id: 47,
          firstName: 'Дмитрий',
          lastName: 'Сидоров',
          age: 28,
          email: 'dmitrysidorov47@example.com',
          photo: '',
        },
        {
          id: 48,
          firstName: 'Ольга',
          lastName: 'Кузнецова',
          age: 24,
          email: 'olgakuznetsova48@example.com',
          photo: '',
        },
        {
          id: 49,
          firstName: 'Никита',
          lastName: 'Смирнов',
          age: 31,
          email: 'nikitasmirnov49@example.com',
          photo: '',
        },
        {
          id: 50,
          firstName: 'Татьяна',
          lastName: 'Попова',
          age: 37,
          email: 'tatyanapopova50@example.com',
          photo: '',
        },
      ];
    }
  });

  watch(
    users,
    (newVal) => {
      localStorage.setItem('users', JSON.stringify(newVal));
    },
    { deep: true },
  );

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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .user-list__toolbar {
    padding: 20px 0 10px 0;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: var(--color-bg-page); // или прозрачный, если нужно
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .user-list__controls {
    margin-left: auto;
    display: flex;
    gap: 12px;
  }

  .user-list__button {
    padding: 10px 16px;
    background-color: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  .user-list__button:hover {
    transform: translateY(-1px);
  }

  .user-list__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .list-enter-active {
    transition: all 0.3s ease;
  }
  .list-leave-active {
    opacity: 0;
    transition: all 0.3s ease;
  }
  .list-move {
    transition: transform 0.3s linear;
  }

  @media (max-width: 768px) {
    .user-list__toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .user-list__controls {
      margin-left: 0;
      justify-content: space-between;
    }
  }
</style>
