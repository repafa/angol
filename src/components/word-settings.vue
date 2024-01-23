<template>
  <form class="mb-5" @submit.prevent="loadWords">
    <div class="row g-2">
      <div class="col-lg">
        <div class="form-floating">
          <select
            class="form-select"
            id="selectType"
            :value="settings.type"
            @change="onChange($event, 'type')"
          >
            <option
              v-for="(label, value) in TYPE_OPTION"
              :key="value"
              :value="value"
            >
              {{ label }}
            </option>
          </select>
          <label for="selectType">Milyen szavakkal szeretnél gyakorolni?</label>
        </div>
      </div>
      <div class="col-lg">
        <div class="form-floating">
          <select
            class="form-select"
            id="selectWay"
            :value="settings.way"
            @change="onChange($event, 'way')"
          >
            <option
              v-for="(label, value) in WAY_OPTION"
              :key="value"
              :value="value"
            >
              {{ label }}
            </option>
          </select>
          <label for="selectWay">Milyen fordításban?</label>
        </div>
      </div>
      <div class="col-lg">
        <div class="form-floating">
          <select
            class="form-select"
            id="selectNumber"
            :value="settings.number"
            @change="onChange($event, 'number')"
          >
            <option
              v-for="value in [10, 20, 30, 40, 50]"
              :key="value"
              :value="value"
            >
              {{ value }}
            </option>
          </select>
          <label for="selectNumber">Szavak száma?</label>
        </div>
      </div>
      <div class="col-lg-2 align-self-center text-center">
        <button type="submit" class="btn btn-success">Újra</button>
      </div>
    </div>
  </form>
</template>

<script>
const TYPE_OPTION = {
  ALL: "Mindegy",
  NEW: "Új/Nem ismert (-)",
  KNOWN: "Ismert (I)",
  LEARNT: "Megtanult (M)",
};
const WAY_OPTION = {
  ALL: "Mindegy",
  1: "Angolról magyarra",
  0: "Magyarról angolra",
};

export default {
  name: "WordSettings",
  props: {
    settings: {
      type: Object,
      required: true,
    },
  },
  computed: {
    TYPE_OPTION: () => TYPE_OPTION,
    WAY_OPTION: () => WAY_OPTION,
  },
  methods: {
    onChange($event, key) {
      this.$emit("changed", {
        ...this.settings,
        [key]: $event.target.value,
      });
    },
    loadWords() {
      this.$emit("update");
    },
  },
};
</script>
