<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseTitle from '../components/BaseTitle.vue'
import useApi from '../composables/useApi'
const route = useRoute()
const { getQuestion } = useApi()

const question = ref(null)
const answers = ref([])

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

onMounted(async () => {
  console.log('QuestionPage mounted. Category ID =', route.params.id)  // DEBUG
  question.value = await getQuestion(route.params.id)

  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
  })

  question.value.incorrect_answers.map((wrong) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer: wrong,
    })
  })

  answers.value = shuffle(answers.value)
})
</script>

<template>
  <main class="min-h-screen bg-slate-600">
    <section class="py-10">
      <div v-if="!question" class="text-center text-white text-xl">Loading…</div>
      <BaseTitle v-else>{{ question.category }}</BaseTitle>
    </section>

    <section v-if="question" class="max-w-4xl mx-auto px-6">
      <div class="flex h-full w-full flex-col items-center gap-8 p-10">
        <div class="text-center text-2xl font-bold" v-html="question.question"></div>
        <div class="w-full grid grid-cols-2 gap-8">
          <div
            v-for="a in answers"
            :key="a.id"
            class="bg-green-500 text-white text-4xl rounded-lg py-10 flex items-center justify-center"
            v-html="a.answer"
          />
        </div>
      </div>
    </section>
  </main>
</template>
