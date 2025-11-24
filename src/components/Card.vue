<script setup>
defineProps({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true }
});
</script>

<template>
  <div
    class="group bg-white rounded-3xl p-6 cursor-pointer transition-all duration-300 border border-slate-200 hover:shadow-2xl hover:-translate-y-1"
  >
    <!-- Фото товара -->
    <div class="w-full aspect-square overflow-hidden rounded-2xl bg-slate-50">
      <img
        :src="imageUrl"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <!-- Название -->
    <p class="mt-4 font-semibold text-xl text-slate-900 leading-tight">
      {{ name }}
    </p>

    <!-- Цена -->
    <div class="mt-2 flex justify-between items-center">
      <span class="text-lg font-medium text-slate-800">{{ price }}</span>

      <button
        class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
      >
        +
      </button>
    </div>
  </div>
</template>
