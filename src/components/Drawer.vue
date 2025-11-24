<script setup>
  import CartItem from './CartItem.vue';
</script>
<template>
<div>
    <div class="fixed top-0 left-0 w-full h-full z-10 opacity-70 bg-black"></div>
     <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col">
      <div class="flex items-center gap-4 mb-6">
        <img src="../assets/img/arrow.png" alt="" class="w-7 h-7 cursor-pointer" />
        <h2 class="text-3xl font-bold">Cart</h2>
      </div>
      <div>
        <CartItem />
      </div>
     </div>
</div>
</template>