<template>
  <div>
    <h1 class="mb-5">Keresztrejtvény</h1>
    <div
      class="row"
      v-for="(solution, index) in rowSolutions"
      :key="solution.en"
    >
      <div class="col-md-2">
        {{ solution.hu }}
      </div>
      <div class="col-md">
        <word-component
          :word="solution.en"
          :solution-position="solutionPositions[index]"
          :max-index="maxIndex"
          has-help
          force-placeholders
          same-cell-width
          :is-right="isRight[index]"
          :is-checked="isChecked[index]"
          @input-changed="(answer) => answerChanged(answer, index)"
          @check="checkAnswer(index)"
        />
      </div>
    </div>
    <div class="row gap-3 mt-5 justify-content-center">
      <button type="button" @click="generate" class="w-auto btn btn-success">
        Új keresztrejtvény
      </button>
      <button class="w-auto btn btn-secondary" @click="checkAnswer">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import dict from "../../words.json";
import WordComponent from "@/components/word-component.vue";
import { randomInt } from "@/common/utils";

export default {
  name: "CrosswordView",
  components: { WordComponent },
  created() {
    this.generate();
  },
  data() {
    return {
      mainSolution: null,
      mainSolutionLettersArray: [],
      wordsByLetter: {},
      rowSolutions: [],
      answers: [],
      isChecked: [],
      isRight: [],
    };
  },
  computed: {
    buttonText() {
      return this.isRight ? "✓" : this.isChecked ? "✗" : "?";
    },
    maxIndex() {
      return Math.max(...this.originalPositions);
    },
    originalPositions() {
      const originalPositions = [...this.mainSolution].map(
        (letter, index) =>
          [...this.rowSolutions[index].en].findIndex(
            (_letter) => _letter === letter
          )
        // [...this.rowSolutions[index]].flatMap((_letter, i) => (_letter === letter ? i  : []))
      );

      return originalPositions;
    },
    solutionPositions() {
      const normalizedPositions = this.originalPositions.map(
        (position) => this.maxIndex - position
      );

      return normalizedPositions;
    },
  },
  methods: {
    answerChanged(answer, index) {
      this.answers[index] = answer;
    },
    checkAnswer(index) {
      if (index == null) {
        this.isChecked = [...Array(this.mainSolutionLettersArray.length)].map(
          () => true
        );
        for (const index of this.rowSolutions.keys()) {
          this.isRight[index] =
            this.rowSolutions[index].en === this.answers[index];
        }
      } else {
        this.isChecked[index] = true;
        this.isRight[index] =
          this.rowSolutions[index].en === this.answers[index];
      }
    },
    generate() {
      const solutionDictionaryIndex = randomInt(80);
      this.mainSolution = dict[solutionDictionaryIndex].en
        .replaceAll(" ", "")
        .replaceAll("-", "");
      this.mainSolutionLettersArray = [...this.mainSolution];
      this.isChecked = [...Array(this.mainSolutionLettersArray.length)].map(
        () => false
      );
      this.isRight = [...this.isChecked];
      this.wordsByLetter = {};
      this.rowSolutions = [];
      this.answers = [];

      const solutionLettersNumber = this.mainSolutionLettersArray.reduce(
        (acc, letter) => ({
          ...acc,
          ...{ [letter]: acc[letter] == null ? 1 : acc[letter] + 1 },
        }),
        {}
      );
      const uniqueLetters = [...new Set(this.mainSolutionLettersArray)];
      for (const letter of uniqueLetters) {
        const possibleWords = dict.filter(
          (row) => row.en !== this.mainSolution && row.en.includes(letter)
        );
        if (possibleWords.length === 0) {
          console.log("nem volt", this.mainSolution, letter);
          this.generate();
        }
        if (possibleWords.length < solutionLettersNumber[letter]) {
          console.log("keves volt", this.mainSolution, letter);
          this.generate();
        }
        this.wordsByLetter[letter] = possibleWords;
      }
      for (let i = 0; i < this.mainSolutionLettersArray.length; i++) {
        const letter = this.mainSolutionLettersArray[i];
        const words = this.wordsByLetter[letter];
        const solutionDictionaryIndex = randomInt(words.length - 1);
        const [randomWord] = words.splice(solutionDictionaryIndex, 1);
        if (this.rowSolutions.includes(randomWord)) {
          i--;
        } else {
          this.rowSolutions.push(randomWord);
        }
      }
    },
  },
};
</script>
