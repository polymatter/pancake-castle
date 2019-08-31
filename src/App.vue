<template>
  <div id="app">
    <Argument
      v-bind:argument="selectedSentence.subject"
      v-bind:isSubject="true"
      v-bind:allElements="allElements"
      v-on:argumentUpdate="subjectUpdated"
    />
    <Predicate
      v-bind:predicate="selectedSentence.predicate"
      v-bind:conjugateVerb="conjugateVerb"
      v-bind:allVerbs="allVerbs"
      v-on:predicateUpdate="predicateUpdated"
    />
    {{ selectedSentence }}
    <hr />
    {{ makeSentence }}
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
        { key: "I", value: "I", firstperson: true, pluralSubjectForm: "Me" },
        { key: "You", value: "You", secondperson: true },
        { key: "Jeffrey", value: "Jeffrey" },
        { key: "Trish", value: "Trish" }
      ],
      allVerbs: [
        { key: 'eat1', infinitive: "to eat", regular: true },
        { key: 'sing1', infinitive: "to sing", regular: true },
        { key: 'wash1', infinitive: "to wash", regular: true, endsWithSibilant: true },
        { key: 'dance1', infinitive: "to dance", regular: true }
      ],
      selectedSentenceIndex: 0,
      sentences: [{ subject: [], predicate: {} }]
    };
  },
  methods: {
    conjugateVerb: function(verb, context) {
      let conjugatedVerb;
      if (verb.regular) {
        let base = verb.infinitive.replace("to ", "");
        let suffix =
          context.firstperson || context.secondperson || context.plural
            ? ""
            : verb.endsWithSibilant
            ? "es"
            : "s";
        conjugatedVerb = base + suffix;
      } else {
        conjugatedVerb = "---";
      }
      return conjugatedVerb;
    },
    andConcatinate: function(values) {
      let lastValue = values.pop();
      return values.length > 0 ? values.join(', ') + ' and ' + lastValue : lastValue;
    },
    predicateUpdated: function(predicate) {
      this.selectedSentence.predicate = predicate;
    },
    subjectUpdated: function(subject) {
      this.selectedSentence.subject = subject;
    }
  },
  computed: {
    makeSentence: function() {
      let sentence = this.selectedSentence;
      if (
        sentence.subject &&
        sentence.predicate &&
        sentence.subject.length > 0
      ) {
        let firstperson =
          !!sentence.subject[0].firstperson && sentence.subject.length === 1;
        let secondperson =
          !!sentence.subject[0].secondperson && sentence.subject.length === 1;
        let plural = sentence.subject.length > 1;
        let _subjects = sentence.subject;
        return (
          this.andConcatinate(_subjects
            .map(s => (plural ? s.pluralSubjectForm || s.value : s.value)))
            +
          " " +
          this.conjugateVerb(sentence.predicate, {
            firstperson,
            secondperson,
            plural
          })
        );
      } else {
        return "---";
      }
    },
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
