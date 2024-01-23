<template>
  <div>
    <h1 class="mb-5">Szógyakorló</h1>
    <word-settings
      :settings="settings"
      @changed="onChange"
      @update="loadWords"
    />
    <word-pair
      v-for="(row, index) in rows"
      :key="row.en"
      :hu="row.hu"
      :en="row.en"
      :type="row.type"
      :index="index + 1"
      :guess-position="row.guessPosition"
    />
  </div>
</template>

<script>
import dict from "../../words.json";
import WordPair from "@/components/word-pair.vue";
import WordSettings from "@/components/word-settings.vue";
import { randomInt } from "@/common/utils";

const ALL = "ALL";

export default {
  components: { WordSettings, WordPair },
  created() {
    this.loadWords();
  },
  data() {
    return {
      words: [],
      rows: [],
      settings: {
        type: ALL,
        way: ALL,
        number: 10,
      },
    };
  },
  methods: {
    onChange(value) {
      this.settings = { ...value };
    },
    guessPosition(way) {
      return way === ALL ? Math.round(Math.random()) : +way;
    },
    loadWords() {
      const rndInt = randomInt(80);
      this.words = dict.slice(rndInt, rndInt + +this.settings.number);
      this.rows = this.words.map((word) => ({
        ...word,
        guessPosition: this.guessPosition(this.settings.way),
      }));
    },
  },
};
</script>
