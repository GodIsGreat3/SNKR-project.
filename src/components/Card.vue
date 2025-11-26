<script setup>
const props = defineProps({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
})

const emit = defineEmits(['add-to-cart'])

const handleAddToCart = () => {
  emit('add-to-cart', {
    id: props.name + props.price,
    name: props.name,
    price: Number(props.price.replace(/\s|₸/g, '')),
    image: props.imageUrl,
    quantity: 1,
  })
}
</script>

<template>
  <div
    class="group bg-white rounded-3xl p-6 cursor-pointer transition-all duration-300 border border-slate-200 hover:shadow-2xl hover:-translate-y-1"
  >
    <div class="w-full aspect-square overflow-hidden rounded-2xl bg-slate-50">
      <img
        :src="imageUrl"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <p class="mt-4 font-semibold text-xl text-slate-900 leading-tight">
      {{ name }}
    </p>

    <div class="mt-2 flex justify-between items-center">
      <span class="text-lg font-medium text-slate-800">{{ price }}</span>

      <!-- это чтобы добавлять в карт -->
      <button
        @click="handleAddToCart"
        class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
      >
        +
      </button>
    </div>
  </div>
</template>
