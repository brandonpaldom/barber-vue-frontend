<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <p>
    Don't have an account?
    <RouterLink :to="{ name: 'register' }" class="link">Register</RouterLink>
  </p>
</template>
