<script setup>
import { RouterLink } from 'vue-router'
import Logo from '../components/Logo.vue'
</script>

<template>
  <div class="h-16 flex items-center justify-between px-6">
    <Logo />
  </div>
  <main class="pt-8 px-6">
    <div class="flex flex-col gap-4 items-start">
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <RouterLink
        :to="{ name: 'my-appointments' }"
        class="btn btn-primary mt-4"
      >
        Go back home
      </RouterLink>
    </div>
  </main>
</template>
