<script setup>
import { ref, computed, watch } from 'vue'
import Header from '../components/Header.vue'
import HeroCarousel from "../components/HeroCarousel.vue"
import CardList from '../components/CardList.vue'
import Footer from '../components/Footer.vue'
import Drawer from '../components/Drawer.vue'

// Инициализация корзины из localStorage
const savedCart = localStorage.getItem('cart')
const cart = ref(savedCart ? JSON.parse(savedCart) : [])
const isDrawerOpen = ref(false)

// Сохранение корзины в localStorage при изменениях
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })

// Добавление товара в корзину
const addToCart = (item) => {
  const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
}

// Удаление товара из корзины
const removeFromCart = (itemId) => {
  const index = cart.value.findIndex(item => item.id === itemId)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

// Изменение количества товара
const updateQuantity = (itemId, quantity) => {
  const item = cart.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = quantity
    if (item.quantity <= 0) {
      removeFromCart(itemId)
    }
  }
}

// Открыть/закрыть корзину
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Очистить корзину после покупки
const clearCart = () => {
  cart.value = []
}

// Вычисляемые свойства
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const taxAmount = computed(() => {
  return Math.round(totalPrice.value * 0.05)
})

const finalPrice = computed(() => {
  return totalPrice.value + taxAmount.value
})

const cartItemsCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})
</script>

<template>
  <div class="bg-gray-50 w-4/5 m-auto min-h-screen rounded-xl shadow-xl mt-10 p-6">
    <Header 
      :cart-items-count="cartItemsCount"
      @open-cart="toggleDrawer"
    />

    <HeroCarousel />

    <div class="p-10">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4"></div>
      
      <CardList 
        :cart="cart"
        @add-to-cart="addToCart"
      />
    </div>

    <Footer />
    
    <Drawer 
      v-if="isDrawerOpen"
      :cart="cart"
      :total-price="totalPrice"
      :tax-amount="taxAmount"
      :final-price="finalPrice"
      @close="toggleDrawer"
      @remove-item="removeFromCart"
      @update-quantity="updateQuantity"
      @checkout="clearCart"
    />
  </div>
</template>