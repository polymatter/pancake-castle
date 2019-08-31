<template>
  <div id="app">
    <Argument
      v-bind:argument="selectedPhrase.subject"
      v-bind:isSubject="true"
      v-bind:allNouns="allNouns"
      v-on:argumentUpdate="subjectUpdated"
    />
    <Predicate
      v-bind:predicate="selectedPhrase.predicate"
      v-bind:allVerbs="allVerbs"
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

export default {
  name: "app",
  data: function() {
    return {
      allNouns: [
        { key: "I", value: "I", firstperson: true, pluralSubjectForm: "Me" },
        { key: "You", value: "You", secondperson: true },
        { key: "Jeffrey", value: "Jeffrey" },
        { key: "Trish", value: "Trish" }
      ],
      allVerbs: [
        { key: "eat1", infinitive: "to eat", regular: true },
        { key: "sing1", infinitive: "to sing", regular: true },
        {
          key: "wash1",
          infinitive: "to wash",
          regular: true,
          endsWithSibilant: true
        },
        { key: "dance1", infinitive: "to dance", regular: true }
      ],
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
      if (phrase.subject && phrase.predicate && phrase.subject.length > 0) {
        let phrase = this.selectedPhrase;
        let firstperson =
          !!phrase.subject[0].firstperson && phrase.subject.length === 1;
        let secondperson =
          !!phrase.subject[0].secondperson && phrase.subject.length === 1;
        let plural = phrase.subject.length > 1;
        let subjectFormed = plural
          ? phrase.subject.map(e => e.pluralSubjectForm || e.value)
          : phrase.subject.map(e => e.value);
        result =
          this.andConcatinate(subjectFormed) +
          " " +
          this.formVerb(phrase.predicate, {
            firstperson,
            secondperson,
            plural
          });
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
