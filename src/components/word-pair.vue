<template>
  <div class="row gap-2 mb-3">
    <div class="col-md">
      <word-component
        :word="en"
        :has-help="guessPosition === 0"
        :is-right="isRight"
        :is-checked="isChecked"
        @input-changed="answerChanged"
        @check="checkAnswer"
      />
    </div>

    <div class="col-md">
      <word-component
        :word="hu"
        :has-help="guessPosition === 1"
        :is-right="isRight"
        :is-checked="isChecked"
        @input-changed="answerChanged"
        @check="checkAnswer"
      />
    </div>

    <div class="col-md-1">
      <button
        class="btn btn-secondary"
        @click="checkAnswer"
        :disabled="answer.length < 2"
      >
        {{ buttonText }}
      </button>
    </div>

    <div class="col-md-1">
      {{ index }}. (<strong>M</strong>)
      <p>
        <em
          ><small>{{ type }}</small></em
        >
      </p>
    </div>
  </div>
</template>

<script>
import WordComponent from "@/components/word-component.vue";

export default {
  name: "WordPair",
  components: { WordComponent },
  props: {
    guessPosition: {
      required: true,
      type: Number,
    },
    hu: {
      required: true,
      type: String,
    },
    en: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      help: 0,
      answer: "",
      isChecked: false,
      isRight: false,
    };
  },
  computed: {
    buttonText() {
      if (this.isRight) {
        return "✓";
      }
      if (this.isChecked) {
        return "✗";
      }

      return "?";
    },
  },
  methods: {
    answerChanged(answer) {
      this.answer = answer;
    },
    checkAnswer() {
      if (this.guessPosition) {
        if (this.hu === this.answer) {
          this.isRight = true;
        } else {
          this.isChecked = true;
        }
      } else {
        if (this.en === this.answer) {
          this.isRight = true;
        } else {
          this.isChecked = true;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.btn.btn-secondary {
  width: 38px;
}
</style>
