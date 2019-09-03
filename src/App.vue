<template>
  <div id="app">
    <Argument
      v-bind:argument="selectedPhrase.subject"
      v-bind:type="'Subject'"
      v-bind:allNouns="allNouns"
      v-on:argumentUpdate="subjectUpdated"
    />
    <Predicate
      v-bind:predicate="selectedPhrase.predicate"
      v-bind:allVerbs="allVerbs"
      v-bind:allObjects="allNouns"
      v-on:predicateUpdate="predicateUpdated"
    />
    {{ selectedPhrase }}
    <hr />
    {{ formPhrase }}
  </div>
</template>

<script>
import Argument from "./components/Argument.vue";
import Predicate from "./components/Predicate.vue";
import Nouns from "./assets/nouns.json";
import Verbs from "./assets/verbs.json";

export default {
  name: "app",
  data: function() {
    return {
      allNouns: Nouns,
      allVerbs: Verbs,
      phraseIndex: 0,
      phrases: [{ subject: [], predicate: {} }]
    };
  },
  methods: {
    formVerb: function(verb, context) {
      let conjugatedVerb;
      if (verb.regular) {
        let base = verb.infinitive.replace("to ", "");
        let suffix =
          context.firstPerson || context.secondPerson || context.plural
            ? ""
            : verb.endsWithSibilant
            ? "es"
            : "s";
        conjugatedVerb = base + suffix;
      } else {
        let tense = verb.presentTense.simple;
        conjugatedVerb = context.firstPerson
          ? tense.firstPerson
          : context.secondPerson
          ? tense.secondPerson
          : context.plural
          ? tense.thirdPerson.plural
          : tense.thirdPerson.singular;
      }
      return conjugatedVerb;
    },
    formSubject: function(subject, context) {
      return this.andConcatinate(
        context.plural
          ? subject.map(e => e.pluralSubjectForm || e.value)
          : subject.map(e => e.value)
      );
    },
    andConcatinate: function(values) {
      let lastValue = values.pop();
      return values.length > 0
        ? values.join(", ") + " and " + lastValue
        : lastValue;
    },
    predicateUpdated: function(predicate) {
      this.selectedPhrase.predicate = predicate;
    },
    subjectUpdated: function(subject) {
      this.selectedPhrase.subject = subject;
    }
  },
  computed: {
    formPhrase: function() {
      let result = "---";
      let phrase = this.selectedPhrase;
      if (
        phrase.subject &&
        phrase.predicate &&
        phrase.subject.length > 0 &&
        Object.keys(phrase.predicate).length > 0
      ) {
        let firstPerson =
          !!phrase.subject[0].firstPerson && phrase.subject.length === 1;
        let secondPerson =
          !!phrase.subject[0].secondPerson && phrase.subject.length === 1;
        let plural = phrase.subject.length > 1;
        let context = { plural, firstPerson, secondPerson };
        let subjectFormed = this.formSubject(phrase.subject, context);
        let predicateFormed = this.formVerb(phrase.predicate.verb, context);
        result = subjectFormed + " " + predicateFormed;
      }
      return result;
    },
    selectedPhrase: function() {
      return this.phrases[this.phraseIndex];
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
