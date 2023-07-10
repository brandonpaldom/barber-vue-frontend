<script setup>
import { useAppointmentsStore } from '../stores/appointments'
import DeleteIcon from '../components/icons/DeleteIcon.vue'
import { formatCurrency } from '../helpers'

const appointmentsStore = useAppointmentsStore()

defineProps({
  service: Object,
})
</script>

<template>
  <div class="flex flex-col justify-between p-4 aspect-square bg-neutral-900">
    <div>
      <p class="font-bold">{{ service.name }}</p>
      <p>{{ formatCurrency(service.price) }} USD</p>
    </div>
    <div
      @click="appointmentsStore.deleteService(service)"
      class="btn-icon btn-red self-end"
    >
      <DeleteIcon class="w-4 h-4" />
    </div>
  </div>
</template>
