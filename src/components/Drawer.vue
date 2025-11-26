<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: Boolean,
  cart: Array,
  totalPrice: Number,
  taxAmount: Number,
  finalPrice: Number,
})

const emit = defineEmits(['close', 'remove-item', 'update-quantity', 'checkout'])
const router = useRouter()

const increase = (item) => emit('update-quantity', item.id, item.quantity + 1)
const decrease = (item) => {
  if (item.quantity > 1) emit('update-quantity', item.id, item.quantity - 1)
}

const goToCart = () => {
  router.push('/cart')
  emit('close')
}
</script>

<template>
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-6 z-50 flex flex-col"
    >
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 text-2xl">
        ×
      </button>

      <h2 class="text-2xl font-bold mb-4">Cart</h2>

      <div class="flex-1 overflow-y-auto space-y-4">
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex items-center justify-between p-4 border rounded-2xl shadow-md border-gray-200/30 hover:shadow-xl transition-all duration-300 bg-white"
        >
          <div class="flex items-center space-x-4">
            <img
              :src="item.image"
              alt="product"
              class="w-20 h-20 object-cover rounded-lg shadow-sm"
            />
            <div class="flex flex-col">
              <p class="text-lg font-semibold text-gray-900">{{ item.name }}</p>
              <p class="text-gray-500">{{ item.price }} ₸</p>

              <div class="mt-2 flex items-center space-x-2">
                <button
                  @click="decrease(item)"
                  class="px-2 py-1 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span class="font-semibold">{{ item.quantity }}</span>
                <button
                  @click="increase(item)"
                  class="px-2 py-1 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            @click="$emit('remove-item', item.id)"
            class="text-red-500 font-bold text-2xl hover:text-red-600 transition"
          >
            ×
          </button>
        </div>

        <p v-if="cart.length === 0" class="text-gray-400 text-center">Cart is empty</p>
      </div>

      <div class="mt-6 border-t pt-4">
        <div class="flex justify-between text-lg font-medium text-gray-700">
          <span>Total price:</span>
          <span>{{ totalPrice }} ₸</span>
        </div>
        <div class="flex justify-between text-lg font-medium text-gray-700">
          <span>TAX 5%:</span>
          <span>{{ taxAmount }} ₸</span>
        </div>
        <div class="flex justify-between text-xl font-bold text-gray-900 mt-2">
          <span>Final price:</span>
          <span>{{ finalPrice }} ₸</span>
        </div>

        <button
          @click="goToCart"
          class="mt-4 w-full py-3 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition"
        >
          Buy now!
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
