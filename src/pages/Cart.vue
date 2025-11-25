<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 grid md:grid-cols-3 gap-8 lg:gap-12 bg-gray-50 min-h-screen">
    
    <div class="md:col-span-2 flex flex-col gap-6">
      <h1 class="text-4xl font-extrabold text-gray-900 border-b-4 border-black pb-4 mb-4">
        Ваша корзина
      </h1>

      <div v-for="item in cart" :key="item.id" class="flex flex-col sm:flex-row gap-4 p-4 lg:p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
        
        <div class="flex items-center gap-4 flex-grow">
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-xl border-4 border-gray-100 flex-shrink-0"/>
          <div class="flex-1 min-w-0">
            <h2 class="text-xl font-bold text-gray-900 truncate">{{ item.name }}</h2>
            <p class="text-sm font-medium text-gray-500 mt-1">Цвет: Черный / Размер: 42</p>
            <p class="text-lg font-semibold text-black mt-2">{{ item.price }} ₸</p>
          </div>
        </div>

        <div class="flex justify-between items-center sm:w-1/3 sm:min-w-[240px] mt-3 sm:mt-0">
          <div class="flex items-center border border-gray-300 rounded-full overflow-hidden flex-shrink-0">
            <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-xl text-gray-700 disabled:opacity-50" @click="decrement(item)" :disabled="item.quantity <= 1">
              −
            </button>
            <span class="px-5 py-2 text-base font-bold text-gray-900">{{ item.quantity }}</span>
            <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-xl text-gray-700" @click="increment(item)">
              +
            </button>
          </div>
          
          <b class="text-xl font-extrabold text-black w-32 text-right hidden sm:block">
             {{ item.price * item.quantity }} ₸
          </b>
          
          <button class="text-red-500 font-medium hover:text-red-700 transition-colors text-sm ml-4" @click="handleRemoveItem(item.id)">
            Удалить
          </button>
        </div>
      </div>
      
      <div v-if="cart.length === 0" class="text-center p-10 bg-white rounded-xl shadow-inner border-2 border-dashed border-gray-300">
        <p class="text-2xl text-gray-500 font-bold">Ваша корзина пуста.</p>
        <p class="text-gray-400 mt-2">Время добавить кроссовки!</p>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">👟 Продолжить покупки</h2>
        <div class="flex flex-wrap gap-4">
          <div class="text-sm font-semibold text-gray-700 bg-white p-2 rounded-full border hover:bg-gray-100 transition-colors cursor-pointer">
            Новая коллекция
          </div>
          <div class="text-sm font-semibold text-gray-700 bg-white p-2 rounded-full border hover:bg-gray-100 transition-colors cursor-pointer">
            Мужская обувь
          </div>
          <div class="text-sm font-semibold text-gray-700 bg-white p-2 rounded-full border hover:bg-gray-100 transition-colors cursor-pointer">
            Спортивная одежда
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-2xl border-2 border-black h-fit sticky top-4">
      <h2 class="text-3xl font-extrabold mb-6 text-gray-900 border-b pb-3">Сводка заказа</h2>

      <div class="mb-6">
        <label for="promo" class="block text-base font-bold text-gray-700 mb-2">Промокод</label>
        <div class="flex gap-2">
          <input 
            type="text" 
            id="promo" 
            placeholder="JUSTDOIT20"
            class="flex-1 block w-full rounded-lg border-2 border-gray-300 shadow-inner p-3 focus:border-red-500 focus:ring-red-500 transition"
          >
          <button class="px-4 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
            OK
          </button>
        </div>
      </div>
      
      <div class="space-y-4 text-lg">
        <div class="flex justify-between">
          <span class="text-gray-600">Сумма товаров ({{ cart.length }} шт.):</span>
          <b class="text-gray-900">{{ totalPrice }} ₸</b>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Доставка:</span>
          <b class="text-green-600 font-bold">БЕСПЛАТНО</b>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Налог (5%):</span>
          <b class="text-gray-900">{{ taxAmount }} ₸</b>
        </div>
      </div>

      <hr class="my-6 border-black">

      <div class="flex justify-between text-2xl font-extrabold mb-6">
        <span>Итого:</span>
        <b class="text-red-600">{{ finalPrice }} ₸</b>
      </div>

      <button 
        class="bg-red-600 w-full rounded-full py-4 text-white font-extrabold text-xl uppercase shadow-lg shadow-red-300 hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50"
        @click="checkout"
        :disabled="cart.length === 0"
      >
        Оформить заказ
      </button>
      
      <div class="mt-6 text-xs text-gray-500 space-y-2">
        <p>🚚 Бесплатная доставка для Nike Members.</p>
        <p>🔄 Бесплатный возврат в течение 30 дней.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const cart = reactive([
  // Заменил заглушки на изображения, похожие на Nike
  { id: 1, name: 'Air Max 90 Essentials', price: 65000, quantity: 1, image: 'https://via.placeholder.com/150/f05b45/ffffff?text=Air+Max' },
  { id: 2, name: 'Tech Fleece Hoodie', price: 32000, quantity: 2, image: 'https://via.placeholder.com/150/000000/ffffff?text=Hoodie' },
  { id: 3, name: 'Dri-FIT T-Shirt', price: 8000, quantity: 1, image: 'https://via.placeholder.com/150/4a4a4a/ffffff?text=Dri-FIT' }
])

// --- Логика корзины (оставлена без изменений) ---

const handleRemoveItem = (id) => {
  const index = cart.findIndex(item => item.id === id)
  if (index !== -1) cart.splice(index, 1)
}

const increment = (item) => {
  item.quantity++
}

const decrement = (item) => {
  if (item.quantity > 1) item.quantity--
}

const totalPrice = computed(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
const taxAmount = computed(() => Math.round(totalPrice.value * 0.05))
const finalPrice = computed(() => totalPrice.value + taxAmount.value)

const checkout = () => {
  if (cart.length > 0) {
    alert(`Заказ оформлен! Итоговая сумма: ${finalPrice.value} ₸. Спасибо за покупку в стиле Nike!`)
  } else {
    alert('Корзина пуста. Добавьте товары, чтобы оформить заказ.')
  }
}
</script>