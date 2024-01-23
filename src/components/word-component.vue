<template>
  <div>
    <div
      v-show="showPlaceholders"
      class="input-group"
      :style="{ 'margin-left': `${solutionPosition * 39}px` }"
    >
      <input
        :class="{
          sameCellWidth: sameCellWidth,
          'bg-info-subtle': i === maxIndex - solutionPosition + 1,
          'bg-success-subtle': isRight,
          'bg-danger-subtle': isChecked && !isRight,
        }"
        v-for="i in word.length"
        :ref="`letters_${i}`"
        :key="i"
        type="text"
        class="form-control text-center text-uppercase"
        maxlength="1"
        @keyup="isLetter($event, i)"
        pattern="[a-zA-Z]"
        :disabled="isRight"
        :value="letters[i - 1]"
      />
      <span class="input-group-text" @click="addHelp"
        ><font-awesome-icon icon="fa-solid fa-lightbulb"
      /></span>
    </div>

    <div v-show="!showPlaceholders" class="input-group">
      <input
        :class="{
          'bg-success-subtle': isRight,
          'bg-danger-subtle': isChecked && !isRight,
        }"
        type="text"
        class="form-control"
        @input="changeInput"
        @keyup.enter="$emit('check')"
        :value="hasHelp ? (answer.length ? answer : '') : word"
        :disabled="!hasHelp || isRight"
        pattern="[a-zA-Z]+"
      />
      <span v-if="hasHelp" class="input-group-text" @click="setPlaceholders"
        ><font-awesome-icon icon="fa-solid fa-lightbulb"
      /></span>
    </div>
  </div>
</template>

<script>
const DELETE_AND_NAV_KEY_CODES = [8, 46, 37, 39];
const isDeleteOrNavKey = (key) => DELETE_AND_NAV_KEY_CODES.includes(key);
const isAlphaKey = (key) => /^[A-Za-záéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ]$/.test(key);

export default {
  name: "WordComponent",
  props: {
    word: {
      type: String,
    },
    hasHelp: {
      type: Boolean,
      default: false,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    forcePlaceholders: {
      type: Boolean,
      default: false,
    },
    sameCellWidth: {
      type: Boolean,
      default: false,
    },
    solutionPosition: {
      type: Number,
      required: false,
    },
    maxIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      letters: this.word.split("").map(() => ""),
      showPlaceholders: false || this.forcePlaceholders,
    };
  },
  computed: {
    answer() {
      return this.letters.join("");
    },
    inputClasses() {
      return {
        sameCellWidth: this.sameCellWidth,
      };
    },
  },
  methods: {
    check() {
      this.$emit("check");
    },
    isLetter($event, index) {
      if (isAlphaKey($event.key) || isDeleteOrNavKey($event.keyCode)) {
        this.letters[index - 1] = $event.target.value;
        if (isDeleteOrNavKey($event.keyCode)) {
          if (
            ($event.keyCode === 37 || $event.keyCode === 8) &&
            this.$refs[`letters_${index - 1}`] !== undefined
          ) {
            this.$refs[`letters_${index - 1}`][0].focus();
          }
          if (
            $event.keyCode === 39 &&
            this.$refs[`letters_${index + 1}`] !== undefined
          ) {
            this.$refs[`letters_${index + 1}`][0].focus();
          }
        } else if (this.$refs[`letters_${index + 1}`] !== undefined) {
          this.$refs[`letters_${index + 1}`][0].focus();
        }
      } else if ($event.keyCode === 13) {
        this.check();
      } else {
        console.log($event.keyCode);
        this.$refs[`letters_${index}`][0].value = "";
        this.letters[index - 1] = "";
      }

      this.$emit("input-changed", this.answer);
    },
    changeInput($event) {
      this.letters = $event.target.value.split("");
      this.$emit("input-changed", this.answer);
    },
    setPlaceholders() {
      if (!this.isRight) {
        this.showPlaceholders = true;
        if (this.answer.length) {
          this.letters = this.word.split("").map(() => "");
        }
        this.$nextTick(() => this.$refs["letters_1"][0].focus());
      }
    },
    addHelp() {
      const index = this.letters.findIndex((letter) => !letter);
      if (index >= 0) {
        this.letters[index] = this.word.charAt(index);
        this.$emit("input-changed", this.answer);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sameCellWidth.form-control {
  width: 40px !important;
  flex-grow: 0;
}

.input-group-text {
  user-select: none;
  cursor: pointer;
}
</style>
