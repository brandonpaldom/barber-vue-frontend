<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <div class="w-full h-full md:w-3/4 relative">
      <RouterView />
    </div>
    <div class="w-full h-full hidden md:flex md:w-1/4 grayscale">
      <img src="/barbershop.jpg" class="object-cover w-full h-full" />
    </div>
  </div>
</template>
