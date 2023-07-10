import { computed, inject, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import appointmentApi from '../services/appointmentApi'
import { formatDateToIso, formatDateToDDMMYYYY } from '../helpers/date'
import { useUserStore } from './user'

export const useAppointmentsStore = defineStore('appointments', () => {
  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')
  const appointmentsByDate = ref([])
  const appointmentId = ref('')

  const toast = inject('toast')
  const router = useRouter()
  const userStore = useUserStore()

  onMounted(() => {
    const start = 10
    const end = 18

    for (let hour = start; hour <= end; hour++) {
      hours.value.push(`${hour}:00`)
    }
  })

  watch(date, async () => {
    time.value = ''
    if (date.value === '') return
    const { data } = await appointmentApi.getByDate(date.value)
    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (a) => a._id !== appointmentId.value
      )
      time.value = data.filter((a) => a._id === appointmentId.value)[0].time
    } else {
      appointmentsByDate.value = data
    }
  })

  function setSelectedAppointment(appointment) {
    services.value = appointment.services
    date.value = formatDateToDDMMYYYY(appointment.date)
    time.value = appointment.time
    appointmentId.value = appointment._id
  }

  function onServiceSelected(service) {
    if (services.value.some((s) => s._id === service._id)) {
      services.value = services.value.filter((s) => s._id !== service._id)
    } else {
      if (services.value.length === 2) {
        alert('You can only select two services per day')
        return
      }
      services.value.push(service)
    }
  }

  function deleteService(service) {
    services.value = services.value.filter((s) => s._id !== service._id)
  }

  async function saveAppointment() {
    const appointment = {
      services: services.value.map((s) => s._id),
      date: formatDateToIso(date.value),
      time: time.value,
      totalPrice: totalPrice.value,
    }

    if (appointmentId.value) {
      try {
        const { data } = await appointmentApi.update(
          appointmentId.value,
          appointment
        )
        toast.open({
          type: 'success',
          message: data.message,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data } = await appointmentApi.create(appointment)
        toast.open({
          type: 'success',
          message: data.message,
        })
      } catch (error) {
        console.log(error)
      }
    }
    clearAppointment()
    userStore.getAppointmentsByUser()
    router.push({ name: 'my-appointments' })
  }

  function clearAppointment() {
    services.value = []
    date.value = ''
    time.value = ''
    appointmentId.value = ''
  }

  async function deleteAppointment(id) {
    if (!confirm('Are you sure you want to delete this appointment?')) return
    try {
      const { data } = await appointmentApi.delete(id)
      toast.open({
        type: 'success',
        message: data.message,
      })
      userStore.getAppointmentsByUser()
    } catch (error) {
      toast.open({
        type: 'error',
        message: error.response.data.error,
      })
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((s) => s._id === id)
  })

  const noServicesSelected = computed(() => {
    return services.value.length === 0
  })

  const totalPrice = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const isValidAppointment = computed(() => {
    return services.value.length && date.value.length && time.value.length
  })

  const isDateSelected = computed(() => {
    return date.value ? true : false
  })

  const disableHours = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find((a) => a.time === hour)
    }
  })

  return {
    services,
    date,
    hours,
    time,
    setSelectedAppointment,
    onServiceSelected,
    deleteService,
    saveAppointment,
    clearAppointment,
    deleteAppointment,
    isServiceSelected,
    noServicesSelected,
    totalPrice,
    isValidAppointment,
    isDateSelected,
    disableHours,
  }
})
