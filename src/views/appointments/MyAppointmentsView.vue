<script setup>
import Appointment from '../../components/Appointment.vue'
import Alert from '../../components/Alert.vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col gap-4 px-6 py-4">
    <h1>My Appointments</h1>
    <div v-if="userStore.isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <Alert v-if="userStore.noAppointments">
        <p>You have not made any appointments yet.</p>
        <p>
          Go to menu and select new appointment button to make an appointment.
        </p>
      </Alert>
      <div v-else class="grid grid-cols-1 gap-4">
        <Appointment
          v-for="appointment in userStore.userAppointments"
          :key="appointment._id"
          :appointment="appointment"
        />
      </div>
    </div>
  </div>
</template>
