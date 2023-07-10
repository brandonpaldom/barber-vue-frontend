import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '../services/authApi'
import appointmentApi from '../services/appointmentApi'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref({})
  const userAppointments = ref([])
  const isLoading = ref(true)

  onMounted(async () => {
    try {
      const { data } = await authApi.auth()
      user.value = data
      await getAppointmentsByUser()
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  })

  async function getAppointmentsByUser() {
    const { data } = await appointmentApi.getByUser(user.value._id)
    userAppointments.value = data
  }

  function logout() {
    localStorage.removeItem('token')
    user.value = {}
    router.push({ name: 'login' })
  }

  const getUserName = computed(() => {
    return user.value.name || ''
  })

  const getUserInitials = computed(() => {
    return user.value.name
      ? user.value.name
          .split(' ')
          .map((name) => name[0])
          .join('')
      : ''
  })

  const getFirstName = computed(() => {
    return user.value.name ? user.value.name.split(' ')[0] : ''
  })

  const noAppointments = computed(() => {
    return userAppointments.value.length === 0
  })

  return {
    user,
    userAppointments,
    getAppointmentsByUser,
    logout,
    getUserName,
    getUserInitials,
    getFirstName,
    noAppointments,
    isLoading,
  }
})
