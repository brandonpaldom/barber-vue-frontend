<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import appointmentApi from '../../services/appointmentApi'
import { useAppointmentsStore } from '../../stores/appointments'

const appointmentsStore = useAppointmentsStore()

const route = useRoute()
const router = useRouter()

const { id } = route.params

onMounted(async () => {
  try {
    const { data } = await appointmentApi.getById(id)
    appointmentsStore.setSelectedAppointment(data)
  } catch (error) {
    router.push({ name: 'my-appointments' })
  }
})
</script>

<template>
  <nav class="flex items-center gap-2 px-6 py-4">
    <RouterLink
      :to="{ name: 'edit-appointment' }"
      class="btn flex-1 text-center"
      :class="
        route.name === 'edit-appointment' ? 'btn-primary' : 'btn-secondary'
      "
      >Services</RouterLink
    >
    <RouterLink
      :to="{ name: 'edit-appointment-details' }"
      class="btn flex-1 text-center"
      :class="
        route.name === 'edit-appointment-details'
          ? 'btn-primary'
          : 'btn-secondary'
      "
      >Summary</RouterLink
    >
  </nav>
  <RouterView />
</template>
