<script setup>
const props = defineProps({
  items: Array
})

const emit = defineEmits(['removeItem', 'updateQuantity'])

const increaseQuantity = (item) => {
  emit('updateQuantity', item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    emit('updateQuantity', item.id, item.quantity - 1)
  } else {
    emit('removeItem', item.id)
  }
}

const removeItem = (itemId) => {
  emit('removeItem', itemId)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div 
      v-for="item in items" 
      :key="item.id"
      class="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
    >
      <!-- Изображение товара -->
      <div class="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <img 
          :src="item.image" 
          :alt="item.title"
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Информация о товаре -->
      <div class="flex-1 flex flex-col justify-between">
        <h3 class="font-semibold text-lg text-gray-900">{{ item.title }}</h3>
        <p class="text-gray-600 font-medium">{{ item.price.toLocaleString('ru-RU') }} ₸</p>
        
        <!-- Количество -->
        <div class="flex items-center gap-2 mt-2">
          <button 
            @click="decreaseQuantity(item)"
            class="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >−</button>
          <span class="px-2 font-medium text-gray-800">{{ item.quantity }}</span>
          <button 
            @click="increaseQuantity(item)"
            class="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >+</button>
        </div>
      </div>
      
      <!-- Кнопка удаления -->
      <button 
        @click="removeItem(item.id)"
        class="ml-2 text-red-500 hover:text-red-600 transition text-xl font-bold"
        title="Удалить"
      >×</button>
    </div>
  </div>
</template>
