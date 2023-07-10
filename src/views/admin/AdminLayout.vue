<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Logo from '../../components/Logo.vue'
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
      class="flex items-center gap-2 hover:bg-neutral-900 rounded-full pr-4 transition-colors duration-300 cursor-pointer select-none"
      @click="showMenu = !showMenu"
    >
      <div
        class="w-10 h-10 bg-white text-black rounded-full grid place-content-center"
      >
        <span>
          {{ userStore.getUserInitials }}
        </span>
      </div>
      <ChevronDownIcon class="w-4 h-4" />
    </div>
  </div>
  <div v-if="showMenu" class="menu">
    <div class="flex flex-col px-4 py-2">
      <p>
        {{ userStore.getUserName }}
      </p>
      <p class="text-neutral-500">
        {{ userStore.getEmail }}
      </p>
    </div>
    <div class="menu-item text-red-500" @click="userStore.logout">
      <p>Logout</p>
      <Logout class="w-4 h-4" />
    </div>
  </div>
  <main class="h-[calc(100%-136px)]">
    <RouterView />
  </main>
</template>
