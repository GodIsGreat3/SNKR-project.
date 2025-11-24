<template>
  <div class="relative w-full h-[600px] overflow-hidden rounded-3xl mx-auto mt-10 group">

    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
      :style="{ opacity: currentIndex === index ? 1 : 0, zIndex: currentIndex === index ? 20 : 0 }"
    >

      <img
        :src="slide.image"
        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        :style="{ transform: currentIndex === index ? 'scale(1) translateX(0)' : 'scale(1.05) translateX(5%)' }"
        :alt="slide.title"
      />

      <div class="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>

      <div class="absolute left-16 bottom-20 text-white z-30 max-w-xl">
        <h1
          class="text-6xl font-extrabold leading-tight drop-shadow-lg transition-all duration-800"
          :class="{
            'translate-x-0 opacity-100': currentIndex === index,
            'translate-x-16 opacity-0': currentIndex !== index
          }"
        >
          {{ slide.title }}
        </h1>
        <p
          class="text-xl mt-4 drop-shadow-md transition-all duration-800 delay-150"
          :class="{
            'translate-x-0 opacity-100': currentIndex === index,
            'translate-x-12 opacity-0': currentIndex !== index
          }"
        >
          {{ slide.subtitle }}
        </p>
        <button
          class="mt-6 bg-white text-black font-semibold px-8 py-3 rounded-full text-lg transition-all duration-500 transform scale-90 hover:scale-105 animate-bounce-once"
          :class="{
            'opacity-100 translate-y-0': currentIndex === index,
            'opacity-0 translate-y-4': currentIndex !== index
          }"
        >
          Shop Now
        </button>
      </div>
    </div>

    <button
      @click="prev"
      class="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 text-black rounded-full p-4 text-3xl shadow-lg transition-all duration-300 hover:scale-110 z-40"
    >
      ‹
    </button>
    <button
      @click="next"
      class="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 text-black rounded-full p-4 text-3xl shadow-lg transition-all duration-300 hover:scale-110 z-40"
    >
      ›
    </button>

    <div class="absolute bottom-6 w-full flex justify-center gap-3 z-40">
      <div
        v-for="(slide, i) in slides"
        :key="'dot' + i"
        class="rounded-full transition-all duration-500"
        :class="currentIndex === i ? 'bg-white w-10 h-3 scale-110 animate-pulse-fast' : 'bg-white/50 w-3 h-3'"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import hero1 from '../assets/img/hero/hero1.jpg';
import hero2 from '../assets/img/hero/hero2.jpg';
import hero3 from '../assets/img/hero/hero3.jpg';

const slides = [
  { image: hero3, title: "ADIDAS HANDBALL SPEZIAL", subtitle: "A timeless classic, these Adidas Handball Spezial sneakers offer a blend of retro style and modern comfort." },
  { image: hero1, title: "AIR JORDAN 1 MID", subtitle: "A legend reborn. Classic silhouette meets premium craftsmanship." },
  { image: hero2, title: "NEW BALANCE 327", subtitle: "Retro-inspired style meets everyday comfort. Lightweight cushioning, bold design, ultimate versatility." },
  
];

const currentIndex = ref(0);

function next() {
  currentIndex.value = currentIndex.value === slides.length - 1 ? 0 : currentIndex.value + 1;
}

function prev() {
  currentIndex.value = currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1;
}


let interval = null;
onMounted(() => { interval = setInterval(next, 7000); });
onUnmounted(() => { clearInterval(interval); });
</script>

<style>
@keyframes bounce-once {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.animate-bounce-once { animation: bounce-once 0.5s ease forwards; }

@keyframes pulse-fast {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}
.animate-pulse-fast { animation: pulse-fast 1s infinite; }
</style>
