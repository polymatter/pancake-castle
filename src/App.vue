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
    <hr/>
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
        { key: "I", value: "I", firstperson: true, pluralSubjectForm: 'Me' },
        { key: "You", value: "You", secondperson: true },
        { key: "Jeffrey", value: "Jeffrey" },
        { key: "Trish", value: "Trish" }
      ],
      allVerbs: [
        { infinitive: "to eat", regular: true },
        { infinitive: "to sing", regular: true },
        { infinitive: "to wash", regular: true },
        { infinitive: "to dance", regular: true }
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
        let suffix = context.firstperson || context.secondperson || context.plural ? "" : "s";
        conjugatedVerb = base + suffix;
      } else {
        conjugatedVerb = "CAN NOT CONJUGATE!!";
      }
      return conjugatedVerb;
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
      if (sentence.subject && sentence.predicate && sentence.subject.length > 0) {
        let firstperson = !!sentence.subject[0].firstperson && sentence.subject.length === 1;
        let secondperson = !!sentence.subject[0].secondperson && sentence.subject.length === 1;
        let plural = sentence.subject.length > 1;
        let _subjects = sentence.subject;
        return (
          _subjects.map(s => plural ? s.pluralSubjectForm || s.value : s.value).join(" and ") +
          " " +
          this.conjugateVerb(sentence.predicate, { firstperson, secondperson, plural })
        );
      } else {
        return '---';
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
