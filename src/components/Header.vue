<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  cartItemsCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['openCart'])
const router = useRouter()

const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.setItem('isAuthenticated', 'false')
  isAuthenticated.value = false
}

const handleOpenCart = () => emit('openCart')

const goToAuth = () => router.push('/auth-page')
</script>

<template>
  <header
    class="flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-2xl shadow-md mb-10"
  >
    <div class="flex items-center gap-4 mb-4 md:mb-0">
      <img
        src="../assets/img/logo.png"
        alt="Logo"
        class="w-14 h-14 rounded-full object-cover shadow-sm"
      />
      <div>
        <h1 class="text-2xl font-extrabold tracking-wide text-gray-900">SNKR SHOP</h1>
        <p class="text-gray-500 text-sm">The best kicks worldwide.</p>
      </div>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <button
        @click="handleOpenCart"
        class="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span class="hidden md:block font-semibold text-gray-700">Cart</span>

        <span
          v-if="cartItemsCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
        >
          {{ cartItemsCount > 9 ? '9+' : cartItemsCount }}
        </span>
      </button>

      <button
        v-if="!isAuthenticated"
        @click="goToAuth"
        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span class="hidden md:block text-gray-700 font-medium">Autorisation</span>
      </button>

      <button
        v-else
        @click="logout"
        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7"
          />
        </svg>
        <span class="hidden md:block font-medium">Logout</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

.animate-pulse {
  animation: pulse 1s infinite;
}

button:active {
  transform: scale(0.97);
  transition: transform 0.1s;
}
</style>
