import { createRouter, createWebHistory } from "vue-router";
import WordsView from "../views/words-view.vue";
import RegistrationView from "../views/registration-view.vue";
import LoginView from "../views/login-view.vue";
import DictionaryView from "@/views/dictionary-view.vue";
import TranslationView from "@/views/translation-view.vue";
import CrosswordView from "@/views/crossword-view.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: WordsView,
  },
  {
    path: "/crossword",
    name: "crossword",
    component: CrosswordView,
  },
  {
    path: "/translation",
    name: "translation",
    component: TranslationView,
  },
  {
    path: "/dictionary",
    name: "dictionary",
    component: DictionaryView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registration",
    name: "registration",
    component: RegistrationView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
