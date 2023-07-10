<script setup>
import { ref } from 'vue'
import { useAppointmentsStore } from '../../stores/appointments'
import { formatCurrency } from '../../helpers'
import SelectedService from '../../components/SelectedService.vue'
import Alert from '../../components/Alert.vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const appointmentsStore = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM',
})

const disableDate = (date) => {
  const today = new Date()
  return (
    date < today ||
    date.getMonth() > today.getMonth() + 1 ||
    [0, 6].includes(date.getDay())
  )
}
</script>

<template>
  <div class="flex flex-col gap-4 px-6 md:h-full md:overflow-y-auto pb-8">
    <h1>Summary</h1>
    <h3>Selected services</h3>

    <p></p>
    <Alert v-if="appointmentsStore.noServicesSelected">
      <p>You have not selected any services.</p>
      <p>Go to the services tab to select services.</p>
    </Alert>
    <div v-else class="flex flex-col gap-4">
      <div
        class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        <SelectedService
          v-for="service in appointmentsStore.services"
          :key="service._id"
          :service="service"
        />
      </div>
      <div class="flex flex-col">
        <h3>Total</h3>
        <p class="text-[1.5rem]">
          {{ formatCurrency(appointmentsStore.totalPrice) }} USD
        </p>
      </div>
      <div>
        <h3>Date and time</h3>
        <p>
          Select a date and time for your appointment. We will contact you to
          confirm the appointment.
        </p>
      </div>
      <div class="flex flex-col lg:flex-row gap-4">
        <VueTailwindDatepicker
          as-single
          no-input
          :formatter="formatter"
          v-model="appointmentsStore.date"
          :disable-date="disableDate"
        />
        <div
          v-if="appointmentsStore.isDateSelected"
          class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 grow h-max"
        >
          <button
            type="button"
            v-for="hour in appointmentsStore.hours"
            class="btn disabled:opacity-25 disabled:cursor-not-allowed"
            :class="
              appointmentsStore.time === hour
                ? 'btn-outline-primary'
                : 'btn-outline-secondary'
            "
            @click="appointmentsStore.time = hour"
            :disabled="appointmentsStore.disableHours(hour) ? true : false"
          >
            {{ hour }}
          </button>
        </div>
      </div>
      <div v-if="appointmentsStore.isValidAppointment" class="flex justify-end">
        <button
          type="button"
          class="btn btn-primary"
          @click="appointmentsStore.saveAppointment"
        >
          Confirm appointment
        </button>
      </div>
    </div>
  </div>
</template>
