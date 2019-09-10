<!-- Represents Editing a specific Predicate Argument -->
<template>
  <span class="nounPhrase">
    <SelectWord
      v-bind:allWords="allNouns"
      v-on:wordUpdate="nounUpdate"
    >
    <slot></slot>
    <template v-slot:modifier><button class="add">+</button></template>
    </SelectWord>
  </span>
</template>

<script>
import SelectWord from "./SelectWord.vue"

export default {
  name: "NounPhrase",
  props: {
    allNouns: Array,
    allAdjectives: Array
  },
  data: function() {
    return {
      nouns: [],
      adjectives: [],
      mode: "view"
    };
  },
  computed: {
  },
  components: {
    SelectWord
  },
  methods: {
      this.nounPhraseUpdate();
    },
    nounPhraseUpdate: function() {
      this.$emit("nounPhraseUpdate", { noun: this.noun });
    },
    validAdjectives: function(type) {
      let result = [];
      if (this.verb && this.verb.directObject) {
        result = this.allObjects.filter(noun =>
          this.verb[type].required.reduce(
            (result, requiredCategory) =>
              result || noun.categories.indexOf(requiredCategory) > -1,
            false
          )
        );
      }
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nounPhrase {
  border-color: coral;
  border-style: dotted;
}
</style>
