<!-- Represents Editing a specific Predicate Argument -->
<template>
  <span class="nounPhrase" v-on:click="toggleMode">
    <slot v-if="mode === 'view'"></slot>
    <template v-if="mode === 'edit'">
      <select v-model="adjectives" v-on:click.stop v-on:change="nounPhraseUpdate" multiple>
        <option
          v-for="adjective in validAdjectives"
          v-bind:key="adjective.key"
          v-bind:value="adjective"
        >{{adjective.value}}</option>
      </select>
      <select v-model="nouns" v-on:click.stop v-on:change="nounPhraseUpdate" multiple>
        <option v-for="noun in allNouns" v-bind:key="noun.key" v-bind:value="noun">{{noun.value}}</option>
      </select>
      <button class="confirm" v-on:click.stop="toggleMode">✓</button>
      <button class="cancel" v-on:click.stop="toggleMode">X</button>
    </template>
  </span>
</template>

<script>
import Adjectives from "../assets/adjectives.json";

export default {
  name: "NounPhrase",
  props: {
    allNouns: Array,
  },
  data: function() {
    return {
      allAdjectives: Adjectives,
      nouns: [],
      adjectives: [],
      mode: "view"
    };
  },
  computed: {
  },
  methods: {
    nounPhraseUpdate: function() {
      this.$emit("nounPhraseUpdate", { nouns: this.nouns });
    },
    toggleMode: function() {
      this.mode = this.mode === "view" ? "edit" : "view";
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
