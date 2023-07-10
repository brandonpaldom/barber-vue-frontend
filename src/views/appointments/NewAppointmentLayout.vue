<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAppointmentsStore } from '../../stores/appointments'

const appointmentsStore = useAppointmentsStore()
const route = useRoute()

onMounted(() => {
  appointmentsStore.clearAppointment()
})
</script>

<template>
  <nav class="flex items-center gap-2 px-6 py-4">
    <RouterLink
      :to="{ name: 'new-appointment' }"
      class="btn flex-1 text-center"
      :class="
        route.name === 'new-appointment' ? 'btn-primary' : 'btn-secondary'
      "
      >Services</RouterLink
    >
    <RouterLink
      :to="{ name: 'appointment-details' }"
      class="btn flex-1 text-center"
      :class="
        route.name === 'appointment-details' ? 'btn-primary' : 'btn-secondary'
      "
      >Summary</RouterLink
    >
  </nav>
  <RouterView />
</template>
