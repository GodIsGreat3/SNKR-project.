<script setup>
import { ref, computed, watch } from 'vue'
import Header from '../components/Header.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import CardList from '../components/CardList.vue'
import Footer from '../components/Footer.vue'
import CartDrawer from '../components/Drawer.vue'

// Состояние Drawer
const isDrawerOpen = ref(false)

// Корзина
const savedCart = localStorage.getItem('cart')
const cart = ref(savedCart ? JSON.parse(savedCart) : [])

// Слежение за корзиной для сохранения в localStorage
watch(
  cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)

// Методы корзины
const addToCart = (item) => {
  const existingItem = cart.value.find((cartItem) => cartItem.id === item.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
}

const removeFromCart = (itemId) => {
  const index = cart.value.findIndex((item) => item.id === itemId)
  if (index !== -1) cart.value.splice(index, 1)
}

const updateQuantity = (itemId, quantity) => {
  const item = cart.value.find((i) => i.id === itemId)
  if (item) {
    item.quantity = quantity
    if (item.quantity <= 0) removeFromCart(itemId)
  }
}

const clearCart = () => {
  cart.value = []
}

// Управление Drawer
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Вычисляемые свойства
const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
const taxAmount = computed(() => Math.round(totalPrice.value * 0.05))
const finalPrice = computed(() => totalPrice.value + taxAmount.value)
const cartItemsCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header с корзиной -->
    <Header :cart-items-count="cartItemsCount" @open-cart="toggleDrawer" />

    <!-- Главный контент -->
    <HeroCarousel />

    <div class="p-10 max-w-6xl mx-auto">
      <CardList :cart="cart" @add-to-cart="addToCart" />
    </div>

    <Footer />

    <!-- Drawer корзины -->
    <CartDrawer
      :isOpen="isDrawerOpen"
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
