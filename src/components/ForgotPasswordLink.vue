<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <p>
    Forgot your password?
    <RouterLink :to="{ name: 'forgot-password' }" class="underline"
      >Reset Password</RouterLink
    >
  </p>
</template>
