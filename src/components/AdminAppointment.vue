<script setup>
import { formatDate } from '../helpers/date'
import { formatCurrency } from '../helpers'

defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="border border-neutral-900 p-4 flex flex-col gap-4">
    <div>
      <p class="font-bold">{{ appointment.user.name }}</p>
      <p class="text-neutral-500">{{ appointment.user.email }}</p>
    </div>
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
  </div>
</template>
