<script setup>
import ServiceItem from '../../components/ServiceItem.vue'
import { useServicesStore } from '../../stores/services'

const servicesStore = useServicesStore()
</script>

<template>
  <div class="flex flex-col gap-4 px-6 md:h-full md:overflow-y-auto pb-8">
    <h1>Services</h1>
    <p>
      Click on the summary tab to see the selected services and confirm your
      appointment.
    </p>
    <div
      class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <ServiceItem
        v-for="service in servicesStore.services"
        :key="service._id"
        :service="service"
      />
    </div>
  </div>
</template>
