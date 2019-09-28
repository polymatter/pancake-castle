<!-- Represents Editing a specific Predicate Argument -->
<template>
  <span class="nounPhrase">
    <template v-if="adjectiveSlots > 0">the</template>
    <template v-for="n in adjectiveSlots">
      <SelectWord
        v-bind:key="n"
        v-bind:allWords="allAdjectives"
        v-bind:eventName="adjectiveUpdateName"
        v-bind:defaultForm="'Adjective'"
        v-on:adjectiveUpdate="adjectiveUpdate"
      ></SelectWord>
      <template v-if="n < adjectiveSlots">
        <template v-if="n + 1 == adjectiveSlots">and</template>
        <template v-else>, </template>
      </template>
    </template>
    <SelectWord
      v-bind:allWords="allNouns"
      v-bind:defaultForm="Subject"
      v-on:wordUpdate="nounUpdate"
    ><slot></slot>
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
      adjectiveUpdateName: "adjectiveUpdate",
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
      this.adjectiveSlots += 1;
    },
    adjectiveUpdate: function(adjective, key) {
      this.adjectives[key - 1] = adjective;
      this.nounPhraseUpdate();
    },
    nounUpdate: function(noun) {
      this.noun = noun;
      this.nounPhraseUpdate();
    },
    nounPhraseUpdate: function() {
      this.$emit("nounPhraseUpdate", { noun: this.noun, adjectives: this.adjectives.map(a => a) });
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
