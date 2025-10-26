<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseTitle from '../components/BaseTitle.vue'
import useApi from '../composables/useApi'
import useScore from '../composables/useScore'
import MainScore from '../components/MainScore.vue'


const route = useRoute()
const router = useRouter()
const { getQuestion } = useApi()
const { changeScore } = useScore()

const question = ref(null)
const answers = ref([])
const notification = ref('')

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

onMounted(async () => {
  question.value = await getQuestion(route.params.id)
  if (!question.value) return

  const pts =
    question.value.difficulty === 'easy'   ? 10 :
    question.value.difficulty === 'medium' ? 20 : 30

  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
    points: pts,
  })

  question.value.incorrect_answers.forEach((wrong) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer: wrong,
      points: -5,
    })
  })

  answers.value = shuffle(answers.value)
})

function handleAnswer(points) {
  changeScore(points)
  notification.value = points > 0 ? 'Correct' : 'Incorrect'
  setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>

<template>
  <main class="min-h-screen bg-slate-600">
    <section class="py-10">
      <div v-if="!question" class="text-center text-white text-xl">Loading…</div>
      <BaseTitle v-else>
        {{ question.category }} - <MainScore />
      </BaseTitle>

      <p
        v-if="notification"
        class="text-center text-xl font-bold mt-2"
        :class="notification === 'Correct' ? 'text-green-500' : 'text-red-500'"
      >
        {{ notification }}
      </p>
    </section>

    <section v-if="question" class="max-w-4xl mx-auto px-6">
      <div class="flex h-full w-full flex-col items-center gap-8 p-10">
        <div class="text-center text-2xl font-bold" v-html="question.question"></div>

        <div class="w-full grid grid-cols-2 gap-8">
          <div
            v-for="a in answers"
            :key="a.id"
            class="bg-green-500 text-white text-4xl rounded-lg py-10 flex items-center justify-center
                   cursor-pointer hover:opacity-90 transition-colors duration-200"
            v-html="a.answer"
            @click="handleAnswer(a.points)"
          />
        </div>
      </div>
    </section>
  </main>
</template>
