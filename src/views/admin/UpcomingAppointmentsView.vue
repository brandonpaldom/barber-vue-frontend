<script setup>
import { useUserStore } from '../../stores/user'
import Alert from '../../components/Alert.vue'
import AdminAppointment from '../../components/AdminAppointment.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col gap-4 px-6 py-4">
    <h1>Upcoming Appointments</h1>
    <div v-if="userStore.isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <Alert v-if="userStore.noAppointments">
        <p>You have no upcoming appointments.</p>
      </Alert>
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <AdminAppointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
