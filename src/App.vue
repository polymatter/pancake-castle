<template>
  <div id="app">
    <Argument v-bind:argument="selectedSentence.subject"
      v-bind:allElements="allElements"/>
    <Predicate v-bind:predicate="selectedSentence.predicate" 
      v-bind:conjugateVerb="conjugateVerb"
      v-bind:allVerbs="allVerbs"/>
  </div>
</template>

<script>
import Argument from "./components/Argument.vue";
import Predicate from "./components/Predicate.vue";

export default {
  name: "app",
  data: function() {
    return {
      allElements: [
        {key: 'I', value: 'I'},
        {key: 'You', value: 'You'},
        {key: 'Jeffrey', value: 'Jeffrey'},
        {key: 'Trish', value: 'Trish'}
      ],
      allVerbs: [
        {infinitive: 'to eat', regular: true},
        {infinitive: 'to sing', regular: true},
        {infinitive: 'to wash', regular: true},
        {infinitive: 'to dance', regular: true}
      ],
      conjugateVerb: function(verb, context) {
        let conjugatedVerb;
        if (verb.regular) {
          let base = verb.infinitive.replace("to ", "");
          let suffix = context.firstperson || context.plural ? "" : "s";
          conjugatedVerb = base + suffix;
        } else {
          conjugatedVerb = "CAN NOT CONJUGATE!!"
        }
        return conjugatedVerb;
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
    Argument,
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
