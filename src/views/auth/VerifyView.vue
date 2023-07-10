<script setup>
import { onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import authApi from '../../services/authApi'

const toast = inject('toast')
const route = useRoute()
const router = useRouter()
const { token } = route.params

onMounted(async () => {
  try {
    const { data } = await authApi.verify(token)
    toast.open({
      type: 'success',
      message: data.message,
    })
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 5000)
  } catch (error) {
    toast.open({
      type: 'error',
      message: error.response.data.error,
    })
  }
})
</script>

<template>
  <div>
    <h1>Verifying...</h1>
    <p>
      Please wait while we verify your account. You will be redirected to the
      login page once the process is complete.
    </p>
  </div>
</template>
