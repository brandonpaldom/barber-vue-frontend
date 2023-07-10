import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import servicesApi from '../services/servicesApi'

export const useServicesStore = defineStore('services', () => {
  const services = ref([])

  onMounted(async () => {
    try {
      const { data } = await servicesApi.getServices()
      services.value = data
    } catch (error) {
      console.log(error)
    }
  })
  return { services }
})
