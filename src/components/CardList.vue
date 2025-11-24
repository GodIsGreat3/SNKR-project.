<script setup>
import Card from './Card.vue'

// Импорт изображений
import img1 from '../assets/img/sneakers/1.jpg'
import img2 from '../assets/img/sneakers/2.jpg'
import img3 from '../assets/img/sneakers/3.jpg'
import img4 from '../assets/img/sneakers/4.jpg'
import img5 from '../assets/img/sneakers/5.jpg'
import img6 from '../assets/img/sneakers/6.jpg'
import img7 from '../assets/img/sneakers/7.jpg'
import img8 from '../assets/img/sneakers/8.jpg'

const sneakers = [
  { id: 1, image: img1, name: 'Nike Air Max 97', price: '49.990 ₸' },
  { id: 2, image: img2, name: 'Nike Air Force 1 Low', price: '39.990 ₸' },
  { id: 3, image: img3, name: 'Nike Dunk Low Retro', price: '44.990 ₸' },
  { id: 4, image: img4, name: 'Nike Air Jordan 1 Mid', price: '59.990 ₸' },
  { id: 5, image: img5, name: 'Nike Blazer Mid', price: '34.990 ₸' },
  { id: 6, image: img6, name: 'Nike Air Max Plus', price: '54.990 ₸' },
  { id: 7, image: img7, name: 'Nike Pegasus 40', price: '37.990 ₸' },
  { id: 8, image: img8, name: 'Nike React Vision', price: '42.990 ₸' }
]
</script>

<template>
  <div class="grid grid-cols-4 gap-10 p-10 max-w-7xl mx-auto">
    <Card
      v-for="sneaker in sneakers"
      :key="sneaker.id"
      :image-url="sneaker.image"
      :name="sneaker.name"
      :price="sneaker.price"
    />
  </div>
</template>
