<script setup>
import { RouterLink } from 'vue-router'
import { formatDate } from '../helpers/date'
import { formatCurrency } from '../helpers'
import { useAppointmentsStore } from '../stores/appointments'

const appointmentsStore = useAppointmentsStore()

defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="border border-neutral-900 p-4 flex flex-col gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-4">
        <div>
          <p>
            <span class="font-bold">Date:</span>
            {{ formatDate(appointment.date) }}
          </p>
          <p>
            <span class="font-bold">Time:</span>
            {{ appointment.time }} hrs
          </p>
        </div>
        <div>
          <p class="font-bold">Total</p>
          <p class="text-[1.25rem]">
            {{ formatCurrency(appointment.totalPrice) }} USD
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <p>Services for this appointment:</p>
        <div class="flex flex-col gap-4">
          <div v-for="services in appointment.services">
            <p class="font-bold">{{ services.name }}</p>
            <p>{{ formatCurrency(services.price) }} USD</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col md:flex-row gap-2">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
        class="btn btn-secondary"
        >Edit appointment</RouterLink
      >
      <button
        type="button"
        class="btn btn-red"
        @click="appointmentsStore.deleteAppointment(appointment._id)"
      >
        Cancel appointment
      </button>
    </div>
  </div>
</template>
