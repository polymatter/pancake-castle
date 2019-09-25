<template>
  <div id="app">
    <NounPhrase
      v-bind:allNouns="allNouns"
      v-bind:allAdjectives="allAdjectives"
      v-on:nounPhraseUpdate="subjectUpdated"
    >{{ selectedPhrase.subject.noun ? formNoun(selectedPhrase.subject.noun) : "Subject" }}
    <template v-slot:formAdjectives>{{ formAdjectives(selectedPhrase.subject.adjectives) }}</template>
    </NounPhrase>
    <Predicate
      v-bind:predicate="selectedPhrase.predicate"
      v-bind:allVerbs="allVerbs"
      v-bind:allObjects="allNouns"
      v-on:predicateUpdate="predicateUpdated"
    >
      {{ selectedPhrase.predicate.verb ? formVerb(selectedPhrase.predicate.verb) : "Verb" }}
      <template v-slot:formAdjectives>{{ selectedPhrase.predicate.objects && formAdjectives(selectedPhrase.predicate.objects.adjectives) }}</template>
      <template
        v-slot:directObject
      >{{ selectedPhrase.predicate.objects && selectedPhrase.predicate.objects.noun ? formNoun(selectedPhrase.predicate.objects.noun) : "Object" }}</template>
    </Predicate>
    <hr />
    <Category
      v-bind:initialWords="allNouns"
    >Thing</Category>
    <hr />
    {{ selectedPhrase }}
    <hr />
    {{ formPhrase }}
  </div>
</template>

<script>
import NounPhrase from "./components/NounPhrase.vue";
import Predicate from "./components/Predicate.vue";
import Adjectives from "./assets/adjectives.json";
import Category from "./components/Category.vue";
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
      let result = this.formAdjectives(subject.adjectives) + " " + this.formNoun(subject.noun);

      return result;
    },
    formObject: function(object) {
      return this.formNoun(object.noun);
    },
    formNoun: function(noun) {
      return (noun.categories && !noun.categories.includes("proper")) 
      ? noun.value.toLowerCase() 
      : noun.value;
    },
    formAdjectives: function(adjectives) {
      let result;
      
      if (Array.isArray(adjectives) && adjectives.length > 0) {
        result = "the " + this.andConcatinate(adjectives.map(a => a.value));
      } else {
        result = "Adjective"
      }

      return result;
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
        phrase.subject.noun &&
        !!phrase.subject.noun.firstPerson;
      let secondPerson =
        phrase.subject.noun &&
        !!phrase.subject.noun.secondPerson;
      let plural = false;
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
        phrase.subject.noun &&
        phrase.predicate.verb &&
        (!phrase.predicate.directObject ||
          phrase.predicate.objects.nouns.length > 0)
      ) {
        let subjectFormed = this.formSubject(phrase.subject);
        let predicateFormed = this.formVerb(phrase.predicate.verb);
        let objectFormed;
        if (
          phrase.predicate.verb.directObject &&
          phrase.predicate.objects.noun
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
    Predicate,
    Category
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
