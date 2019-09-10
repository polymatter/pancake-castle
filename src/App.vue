<template>
  <div id="app">
    <NounPhrase
      v-bind:allNouns="allNouns"
      v-bind:allAdjectives="allAdjectives"
      v-on:nounPhraseUpdate="subjectUpdated"
    >{{ selectedPhrase.subject.nouns ? formSubject(selectedPhrase.subject) : "Subject" }}</NounPhrase>
    <Predicate
      v-bind:predicate="selectedPhrase.predicate"
      v-bind:allVerbs="allVerbs"
      v-bind:allObjects="allNouns"
      v-on:predicateUpdate="predicateUpdated"
    >
      {{ selectedPhrase.predicate.verb ? formVerb(selectedPhrase.predicate.verb) : "Verb" }}
      <template
        v-slot:directObject
      >{{ selectedPhrase.predicate.objects && selectedPhrase.predicate.objects.nouns ? formObject(selectedPhrase.predicate.objects) : "Object" }}</template>
    </Predicate>
    {{ selectedPhrase }}
    <hr />
    {{ formPhrase }}
  </div>
</template>

<script>
import NounPhrase from "./components/NounPhrase.vue";
import Predicate from "./components/Predicate.vue";
import Adjectives from "./assets/adjectives.json";
import Nouns from "./assets/nouns.json";
import Verbs from "./assets/verbs.json";

export default {
  name: "app",
  data: function() {
    return {
      allAdjectives: Adjectives,
      allNouns: Nouns,
      allVerbs: Verbs,
      phraseIndex: 0,
      phrases: [{ subject: {}, predicate: {} }]
    };
  },
  methods: {
    formVerb: function(verb) {
      let context = this.formContext;
      let conjugatedVerb;
      let tense = {};
      if (verb.regularBaseForm) {
        let base = verb.regularBaseForm;
        tense.firstPerson = base;
        tense.secondPerson = base;
        tense.thirdPerson = base + (verb.endsWithSibilant ? "es" : "s");
        tense.thirdPersonPlural = base;
      } else {
        tense = verb.presentTense.simple;
      }

      conjugatedVerb = tense[context.verbForm];
      return conjugatedVerb;
    },
    formSubject: function(subject) {
      return subject.nouns[0].value;
      // return this.andConcatinate(
      //   this.formContext.plural
      //     ? subject.nouns.map(e => e.pluralSubjectForm || e.value)
      //     : subject.nouns.map(e => e.value)
      // );
    },
    formObject: function(object) {
      return this.andConcatinate(
        this.formContext.plural
          ? object.nouns.map(e => e.objectForm || e.value)
          : object.nouns.map(e => e.value)
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
    formContext: function() {
      let phrase = this.selectedPhrase;
      let firstPerson =
        phrase.subject.nouns &&
        phrase.subject.nouns.length === 1 &&
        !!phrase.subject.nouns[0].firstPerson;
      let secondPerson =
        phrase.subject.nouns &&
        phrase.subject.nouns.length === 1 &&
        !!phrase.subject.nouns[0].secondPerson;
      let plural = phrase.subject.nouns && phrase.subject.nouns.length > 1;
      let verbForm = plural
        ? "thirdPersonPlural"
        : firstPerson
        ? "firstPerson"
        : secondPerson
        ? "secondPerson"
        : "thirdPerson";
      let context = { plural, firstPerson, secondPerson, verbForm };
      return context;
    },
    formPhrase: function() {
      let result = "---";
      let phrase = this.selectedPhrase;
      if (
        phrase.subject &&
        phrase.predicate &&
        phrase.subject.nouns &&
        phrase.subject.nouns.length > 0 &&
        phrase.predicate.verb &&
        (!phrase.predicate.directObject ||
          phrase.predicate.objects.nouns.length > 0)
      ) {
        let subjectFormed = this.formSubject(phrase.subject);
        let predicateFormed = this.formVerb(phrase.predicate.verb);
        let objectFormed;
        if (
          phrase.predicate.verb.directObject &&
          phrase.predicate.objects.nouns
        ) {
          objectFormed = this.formObject(phrase.predicate.objects);
        }
        result =
          subjectFormed +
          " " +
          predicateFormed +
          (objectFormed ? " " + objectFormed : "");
      }
      return result;
    },
    selectedPhrase: function() {
      return this.phrases[this.phraseIndex];
    }
  },
  components: {
    NounPhrase,
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
button.cancel {
  background-color: #f44336;
  color: white;
}
button.confirm {
  background-color: darkgreen;
  color: white;
}
button.add {
  background-color: darkblue;
  color: white;
}
</style>
