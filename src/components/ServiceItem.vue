<script setup>
import { useAppointmentsStore } from '../stores/appointments'
import { formatCurrency } from '../helpers'

const appointmentsStore = useAppointmentsStore()

defineProps({
  service: Object,
})
</script>

<template>
  <div
    class="p-4 transition-colors duration-300 aspect-square flex flex-col justify-end cursor-pointer"
    :class="
      appointmentsStore.isServiceSelected(service._id)
        ? 'btn-primary'
        : 'btn-secondary'
    "
    @click="appointmentsStore.onServiceSelected(service)"
  >
    <p class="font-bold">{{ service.name }}</p>
    <p>{{ formatCurrency(service.price) }} USD</p>
  </div>
</template>
