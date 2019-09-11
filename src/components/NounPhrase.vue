<!-- Represents Editing a specific Predicate Argument -->
<template>
  <span class="nounPhrase">
    <SelectWord
      v-for="n in adjectiveSlots"
      v-bind:key="n"
      v-bind:allWords="allAdjectives"
      v-on:wordUpdate="adjectiveUpdate"
    >{{ adjectives && adjectives[0] ? adjectives[0].value : "" }}</SelectWord>
    <SelectWord
      v-bind:allWords="allNouns"
      v-on:wordUpdate="nounUpdate"
    >
    <slot></slot>
    <template v-slot:modifier><button class="add" v-on:click="addAdjective">+</button></template>
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
      noun: "",
      adjectiveSlots: 0,
      adjectives: [],
    };
  },
  computed: {
  },
  components: {
    SelectWord
  },
  methods: {
    addAdjective: function() {
      this.adjectiveSlots = 1;
    },
    adjectiveUpdate: function(adjective) {
      this.adjectives = adjective;
    },
    nounUpdate: function(nouns) {
      this.noun = nouns[0];
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
