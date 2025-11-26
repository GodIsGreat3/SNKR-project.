<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Хэдер -->
    <Header />

    <!-- Основной контент -->
    <div class="py-12 px-6">
      <h1 class="text-5xl font-bold mb-12 text-center text-gray-900">Your cart:</h1>

      <div
        v-if="cart.length === 0"
        class="flex flex-col items-center justify-center bg-white rounded-3xl p-8 space-y-7 max-w-lg mx-auto"
      >
        <img src="../assets/img/empty-cart.jpg" alt="Empty Cart" class="w-48 h-48 object-contain" />
        <p class="text-gray-500 text-xl text-center">Cart is empty...</p>
        <button
          @click="$router.push('/')"
          class="px-6 py-3 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition"
        >
          Add some fresh kicks!
        </button>
      </div>

      <div v-else class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div
          class="flex-1 bg-white rounded-3xl shadow-md p-6 space-y-6 max-h-[600px] overflow-y-auto"
        >
          <div
            v-for="item in cart"
            :key="item.id"
            class="flex items-center justify-between p-4 border rounded-2xl shadow-sm border-gray-200/20 hover:shadow-md transition-all duration-300 bg-white"
          >
            <div class="flex items-center space-x-5">
              <img
                :src="item.image"
                alt="product"
                class="w-24 h-24 object-cover rounded-lg shadow-sm"
              />

              <div class="flex flex-col">
                <p class="text-xl font-semibold text-gray-900">{{ item.name }}</p>
                <p class="text-gray-500 text-lg">{{ item.price }} ₸</p>

                <div class="mt-3 flex items-center space-x-3">
                  <button
                    @click="decrease(item)"
                    class="px-4 py-1 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                  >
                    -
                  </button>

                  <span class="text-lg font-semibold">{{ item.quantity }}</span>

                  <button
                    @click="increase(item)"
                    class="px-4 py-1 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              @click="removeFromCart(item.id)"
              class="text-red-500 font-bold text-3xl hover:text-red-600 transition"
            >
              ×
            </button>
          </div>
        </div>

        <div
          class="w-full lg:w-1/3 bg-white rounded-3xl shadow-md p-8 flex flex-col justify-between"
        >
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900">Checkout Summary</h2>

            <div class="flex justify-between text-lg font-medium text-gray-700">
              <span>Full Price:</span>
              <span>{{ total }} ₸</span>
            </div>

            <div class="flex justify-between text-lg font-medium text-gray-700">
              <span>TAX 5%:</span>
              <span>{{ tax }} ₸</span>
            </div>

            <div class="border-t pt-4 flex justify-between text-2xl font-bold text-gray-900">
              <span>Total Price:</span>
              <span>{{ finalPrice }} ₸</span>
            </div>
          </div>

          <div class="mt-8 flex flex-col gap-4">
            <button
              @click="checkout"
              class="w-full px-6 py-4 bg-black text-white font-bold text-lg rounded-2xl hover:bg-gray-800 transition"
            >
              Pay!
            </button>

            <button
              @click="clearCart"
              class="w-full px-6 py-4 bg-red-600 text-white font-semibold text-lg rounded-2xl hover:bg-red-700 transition"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '../store/cart'
import Header from '@/components/Header.vue'

const { cart, removeFromCart, clearCart } = useCart()

const increase = (item) => {
  item.quantity++
}

const decrease = (item) => {
  if (item.quantity > 1) item.quantity--
}

const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const tax = computed(() => Math.round(total.value * 0.05))
const finalPrice = computed(() => total.value + tax.value)

const checkout = () => {
  alert(`Оплата: ${finalPrice.value} ₸ (функция оплаты пока не реализована)`)
}
</script>

<style scoped>
.flex-1::-webkit-scrollbar {
  width: 6px;
}
.flex-1::-webkit-scrollbar-track {
  background: transparent;
}
.flex-1::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>
