<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import BaseTitle from '../components/BaseTitle.vue'
import useApi from '../composables/useApi'
import MainScore from '../components/MainScore.vue'


const { categories, getCategories } = useApi()

onMounted(async () => {
  await getCategories()
  console.log('Loaded categories:', categories.value.length)
})
</script>

<template>
  <section class="py-10">
    <BaseTitle>Trivia Application - <MainScore /></BaseTitle>
  </section>

  <section class="py-4">
    <h2 class="text-white text-xl mb-4 text-center">Categories</h2>

    <div class="grid grid-cols-4 gap-12 m-20">
      <RouterLink
        v-for="c in categories"
        :key="c.id"
        :to="`/question/category/${c.id}`"
        class="bg-white text-center h-32 rounded-lg border-4 border-slate-500 font-bold uppercase py-4
               flex items-center justify-center
               hover:bg-red-400 hover:text-white hover:border-red-500 cursor-pointer
               transition-colors duration-300"
      >
        {{ c.name }}
      </RouterLink>
    </div>
  </section>
</template>
