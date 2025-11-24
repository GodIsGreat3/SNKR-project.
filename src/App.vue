<script setup>
  import Header from './components/Header.vue'
  import HeroCarousel from "./components/HeroCarousel.vue"
  import CardList from './components/CardList.vue'
  import Footer from './components/Footer.vue'
  import Drawer from './components/Drawer.vue'
</script>

<template>
  <div class="bg-gray-50 w-4/5 m-auto min-h-screen rounded-xl shadow-xl mt-10 p-6">
    <Header />
    
    <HeroCarousel />
    <div class="p-10">
      <h2 class="text-3xl font-bold mb-10">All pairs</h2>

      <CardList />
      </div>
      <Footer />
      <Drawer />
  </div>
</template>
