<template>
  <div id="app">
    <Predicate v-bind:predicate="selectedSentence.predicate" 
      v-bind:conjugateVerb="conjugateVerb"/>
  </div>
</template>

<script>
import Predicate from "./components/Predicate.vue";

export default {
  name: "app",
  data: function() {
    return {
      conjugateVerb: function(verb, context) {
        let base = verb.replace("to ", "");
        let suffix = context.firstperson || context.plural ? "" : "s";
        return base + suffix;
      },
      selectedSentenceIndex: 0,
      sentences: [{ subject: {}, predicate: {} }]
    };
  },
  computed: {
    selectedSentence: function() {
      return this.sentences[this.selectedSentenceIndex];
    }
  },
  components: {
    Predicate
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
