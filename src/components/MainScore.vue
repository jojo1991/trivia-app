<script setup>
import useScore from '../composables/useScore'
const { score } = useScore()
</script>

<template>
  <span class="font-bold text-white text-xl">Score: {{ score }}</span>
</template>