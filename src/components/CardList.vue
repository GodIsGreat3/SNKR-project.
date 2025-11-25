<script setup>
import { ref, computed } from 'vue';
import Card from './Card.vue';

import img1 from '../assets/img/sneakers/1.jpg'
import img2 from '../assets/img/sneakers/2.jpg'
import img3 from '../assets/img/sneakers/3.jpg'
import img4 from '../assets/img/sneakers/4.jpg'
import img5 from '../assets/img/sneakers/5.jpg'
import img6 from '../assets/img/sneakers/6.jpg'
import img7 from '../assets/img/sneakers/7.jpg'
import img8 from '../assets/img/sneakers/8.jpg'

const sneakers = [
  { id: 1, image: img1, name: 'Nike Air Max 97', price: 49990 },
  { id: 2, image: img2, name: 'Nike Air Force 1 Low', price: 39990 },
  { id: 3, image: img3, name: 'Nike Dunk Low Retro', price: 44990 },
  { id: 4, image: img4, name: 'Nike Air Jordan 1 Mid', price: 59990 },
  { id: 5, image: img5, name: 'Nike Blazer Mid', price: 34990 },
  { id: 6, image: img6, name: 'Nike Air Max Plus', price: 54990 },
  { id: 7, image: img7, name: 'Nike Pegasus 40', price: 37990 },
  { id: 8, image: img8, name: 'Nike React Vision', price: 42990 }
]

const searchQuery = ref('');
const sortOption = ref('name');

const filteredSneakers = computed(() => {
  let result = sneakers;

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(s => s.name.toLowerCase().includes(q));
  }

  if (sortOption.value === 'name') {
    result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === 'price-asc') {
    result = result.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption.value === 'price-desc') {
    result = result.slice().sort((a, b) => b.price - a.price);
  }

  return result;
});
</script>

<template>
  <div class="p-10">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
      <h2 class="text-3xl font-bold">All pairs</h2>

      <div class="flex flex-col sm:flex-row sm:items-center gap-3">

        <select v-model="sortOption" class="py-2 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black focus:border-black transition">
          <option value="name">Sort by name</option>
          <option value="price-asc">From cheapest to most expensive</option>
          <option value="price-desc">From most expensive to cheapest</option>
        </select>

        <div class="relative w-full sm:w-64">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search..." 
            class="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          >
          <img src="../assets/img/search.svg" alt="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60">
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      <Card
        v-for="sneaker in filteredSneakers"
        :key="sneaker.id"
        :image-url="sneaker.image"
        :name="sneaker.name"
        :price="sneaker.price.toLocaleString('ru-RU') + ' ₸'"
        @add-to-cart="$emit('add-to-cart', $event)" 
      />
    </div>
  </div>
</template>
