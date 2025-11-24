<template>
  <header
    class="flex justify-between items-center bg-white rounded-2xl p-6  mt-10 border border-slate-200"
  >

    <div class="flex items-center gap-4">
      <img
        src="../assets/img/logo.png"
        alt="Logo"
        class="w-16 h-16 rounded-full object-cover"
      />

      <div>
        <h2 class="text-3xl font-black tracking-wide text-black uppercase">
          SNKR
        </h2>
        <p class="text-sm text-slate-500">
          Premium Sneakers Store
        </p>
      </div>
    </div>

    <ul class="flex items-center gap-8 text-black">

      <li class="flex items-center gap-2 cursor-pointer group">
        <img
          src="../assets/img/cart.svg"
          alt="Cart"
          class="w-6 h-6 opacity-70 group-hover:opacity-100 transition"
        />
        <span class="font-semibold text-lg">15.000₸</span>
      </li>

      <li class="flex items-center gap-2 cursor-pointer group">
        <img
          src="../assets/img/heart.svg"
          alt="Saved"
          class="w-6 h-6 opacity-70 group-hover:opacity-100 transition"
        />
        <span class="font-medium text-lg">Saved</span>
      </li>

      <li class="flex items-center gap-2 cursor-pointer group">
        <img
          src="../assets/img/user.svg"
          alt="Profile"
          class="w-6 h-6 opacity-70 group-hover:opacity-100 transition"
        />
        <span class="font-medium text-lg">Profile</span>
      </li>

    </ul>

  </header>
</template>
