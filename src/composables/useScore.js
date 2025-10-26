import { ref } from 'vue'

const score = ref(0)

export default function useScore() {
  const changeScore = (value) => {
    score.value += value
  }
  return { score, changeScore }
}
