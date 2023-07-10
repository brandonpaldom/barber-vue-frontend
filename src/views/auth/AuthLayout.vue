<script setup>
import { RouterView } from 'vue-router'
import Logo from '../../components/Logo.vue'
</script>

<template>
  <div class="h-16 flex items-center justify-between px-6">
    <Logo />
  </div>
  <main class="pt-8 px-6">
    <RouterView />
  </main>
</template>
