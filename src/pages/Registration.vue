<template>
  <div class="flex justify-center items-center min-h-screen p-4 bg-gray-50">
    <div
      class="flex w-full max-w-6xl bg-gray-900 rounded-lg shadow-2xl shadow-gray-700 overflow-hidden"
    >
      <!-- Левая панель -->
      <div
        class="branding-panel flex-1 p-8 text-white flex flex-col justify-between min-w-[300px] bg-cover bg-center"
        :style="{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${brandingImageUrl})`,
        }"
      >
        <header class="flex justify-between items-center">
          <span class="text-2xl font-bold tracking-widest cursor-pointer">SNKR. CLUB</span>
        </header>

        <div class="text-center mb-10">
          <h1 class="text-5xl font-black text-white">THE KICK RESERVE</h1>
        </div>
      </div>

      <div class="form-panel flex-1 p-8 md:p-14 min-w-[350px] bg-white">
        <header class="text-center mb-8">
          <h2 class="text-4xl font-black text-gray-900">CREATE ACCOUNT</h2>
        </header>

        <form @submit.prevent="submitForm">
          <!-- Поля -->
          <div v-for="field in formFields" :key="field.key" class="mb-4">
            <label :for="field.key" class="block text-sm font-medium text-gray-700">
              {{ field.label }}
            </label>

            <input
              :type="field.type"
              :id="field.key"
              v-model="formData[field.key]"
              class="w-full p-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:bg-white focus:border-indigo-600 transition"
              :placeholder="field.placeholder"
              required
            />
          </div>

          <!-- Кнопки -->
          <div class="flex justify-end space-x-4 pt-8">
            <button
              type="button"
              class="px-8 py-3 bg-gray-600 text-white rounded-md font-bold uppercase"
              @click="cancelForm"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="px-8 py-3 bg-indigo-600 text-white rounded-md font-bold uppercase"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const brandingImageUrl = '../assets/img/premium-sneakers-bg.jpg'

const formData = reactive({
  name: '',
  email: '',
  password: '',
})

const formFields = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Type your Name' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'Type your Email' },
  { key: 'password', label: 'Password', type: 'password', placeholder: 'Type your Password' },
]

const submitForm = async () => {
  console.log('Отправка формы на бэкенд:', formData)

  try {
    const response = await axios.post('http://localhost:5000/auth/register', {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    })

    console.log('Ответ сервера:', response.data)

    Object.keys(formData).forEach((key) => (formData[key] = ''))
  } catch (error) {
    console.error('Ошибка при регистрации:', error.response?.data || error.message)
  }
}

const cancelForm = () => {
  Object.keys(formData).forEach((key) => (formData[key] = ''))
}
</script>

<style scoped>
@media (max-width: 768px) {
  .branding-panel {
    display: none;
  }
}
@media (min-width: 768px) {
  .branding-panel {
    min-width: 45%;
  }
}
</style>
