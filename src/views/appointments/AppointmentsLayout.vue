<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Logo from '../../components/Logo.vue'
import User from '../../components/icons/User.vue'
import Plus from '../../components/icons/Plus.vue'
import Logout from '../../components/icons/Logout.vue'
import { useUserStore } from '../../stores/user'
import ChevronDownIcon from '../../components/icons/ChevronDownIcon.vue'

const userStore = useUserStore()
const showMenu = ref(false)
</script>

<template>
  <div class="h-16 flex items-center justify-between px-6">
    <Logo />
    <div
      @mouseenter="showMenu = !showMenu"
      class="flex items-center gap-2 hover:bg-neutral-900 rounded-full pr-4 transition-colors duration-300"
    >
      <div
        class="w-10 h-10 bg-neutral-800 rounded-full grid place-content-center"
      >
        <p>
          {{ userStore.getUserInitials }}
        </p>
      </div>
      <p>{{ userStore.getFirstName }}</p>
      <ChevronDownIcon class="w-4 h-4" />
    </div>
  </div>
  <div
    v-if="showMenu"
    @mouseleave="showMenu = !showMenu"
    @click="showMenu = !showMenu"
    class="menu"
  >
    <RouterLink :to="{ name: 'my-appointments' }" class="menu-item">
      <User class="w-5 h-5" />
      <p>My appointments</p>
    </RouterLink>
    <RouterLink :to="{ name: 'new-appointment' }" class="menu-item">
      <Plus class="w-5 h-5" />
      <p>New appointment</p>
    </RouterLink>
    <div class="menu-item text-red-500" @click="userStore.logout">
      <Logout class="w-5 h-5" />
      <p>Logout</p>
    </div>
  </div>
  <main class="h-[calc(100%-136px)]">
    <RouterView />
  </main>
</template>
