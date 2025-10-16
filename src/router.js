import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import QuestionPage from './views/QuestionPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/question/category/:id', name: 'Question', component: QuestionPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
