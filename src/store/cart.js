// src/store/cart.js
import { ref, watch } from 'vue'

const cart = ref([])

// Загружаем корзину из LocalStorage
const savedCart = localStorage.getItem('cart')
if (savedCart) {
  cart.value = JSON.parse(savedCart)
}

// Автоматическое сохранение
watch(
  cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)

// ⚠️ ВАЖНО: именованный экспорт, НЕ default
export function useCart() {
  const addToCart = (product) => {
    cart.value.push(product)
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  const clearCart = () => {
    cart.value = []
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  }
}
