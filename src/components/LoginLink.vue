<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <p>
    Already have an account?
    <RouterLink :to="{ name: 'login' }" class="underline">Login</RouterLink>
  </p>
</template>
