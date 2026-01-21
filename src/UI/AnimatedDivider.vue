<template>
  <div class="animated-divider"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .animated-divider {
    width: 100%;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--color-bg-page),
      var(--color-bg-card),
      var(--color-text-primary),
      var(--color-text-secondary),
      var(--color-accent),
      var(--color-bg-page)
    );
    background-size: 300% 100%; /* увеличиваем ширину градиента для движения */
    animation: gradientSlide 10s linear infinite;
    border-radius: 1px; /* мягкие края */
  }

  @keyframes gradientSlide {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
