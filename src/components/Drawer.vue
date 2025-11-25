<script setup>
import { useRouter } from 'vue-router'
import ItemCartList from './ItemCartList.vue'

const props = defineProps({
  cart: Array,
  totalPrice: Number,
  taxAmount: Number,
  finalPrice: Number
})

const emit = defineEmits(['close', 'removeItem', 'updateQuantity', 'checkout'])

const router = useRouter() 

const handleClose = () => {
  emit('close')
}

const handleRemoveItem = (itemId) => {
  emit('removeItem', itemId)
}

const handleUpdateQuantity = (itemId, quantity) => {
  emit('updateQuantity', itemId, quantity)
}

// Изменяем checkout
const handleCheckout = () => {
  if (props.cart.length > 0) {

    emit('checkout')
    emit('close')

    router.push('/cart') 
  }
}
</script>

<template>
  <div>
    <div 
      class="fixed top-0 left-0 w-full h-full bg-black opacity-70"
      style="z-index: 999;"
      @click="handleClose"
    ></div>
    
    <div class="bg-white w-96 h-full fixed right-0 top-0 p-8 flex flex-col" style="z-index: 1000;">
      <div class="flex items-center gap-4 mb-6">
        <img 
          src = "../assets/img/arrow.png"
          alt="Закрыть" 
          class="w-7 h-7 cursor-pointer hover:opacity-70 transition-opacity" 
          @click="handleClose"
        />
        <h2 class="text-3xl font-bold">Корзина</h2>
      </div>

      <div class="flex-1 overflow-y-auto mb-6">
        <div v-if="cart.length === 0" class="text-center text-gray-500 mt-10">
          <p class="text-lg">Корзина пуста</p>
          <p class="text-sm mt-2">Добавьте товары для покупки</p>
        </div>
        
        <ItemCartList 
          v-else
          :items="cart"
          @removeItem="handleRemoveItem"
          @updateQuantity="handleUpdateQuantity"
        />
      </div>

      <div class="flex flex-col gap-4 mb-7">
        <div class="flex gap-2">
          <span>Полная цена:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₸</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ taxAmount }} ₸</b>
        </div>

        <div class="flex gap-2 text-lg">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ finalPrice }} ₸</b>
        </div>
      </div>

      <button 
        :disabled="cart.length === 0"
        @click="handleCheckout"
        class="bg-black w-full rounded-xl py-3 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        {{ cart.length === 0 ? 'Корзина пуста' : 'Купить сейчас!' }}
      </button>
    </div>
  </div>
</template>