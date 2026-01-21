<template>
  <div class="app">
    <h1>Список пользователей</h1>
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
  .app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
  }

  .app h1 {
    font-size: 2.5em;
    color: var(--color-accent);
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .app {
      padding: 20px 10px;
    }
    .app h1 {
      font-size: 2em;
    }
  }
</style>
