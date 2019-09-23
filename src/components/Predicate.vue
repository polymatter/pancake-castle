<!-- Represents Editing a specific Predicate -->
<template>
  <span class="predicate">
    <span class="verb" v-on:click="toggleMode">
      <slot v-if="mode === 'view'"></slot>
      <select v-model="verb" v-on:click.stop v-if="mode === 'edit'">
        <option
          v-for="verb in allVerbs"
          v-bind:key="verb.key"
          v-bind:value="verb"
        >{{verb.shortDescription || verb.key}}</option>
      </select>
    </span>
    <span class="objects" v-if="verb">
      <NounPhrase
        v-if="verb && verb.directObject"
        v-bind:allNouns="allObjects"
        v-bind:allAdjectives="allAdjectives"
        v-on:nounPhraseUpdate="updateObject"
      >
        <slot name="directObject"></slot>
        <template v-slot:formAdjectives><slot name="formAdjectives"></slot></template>
      </NounPhrase>
    </span>
    <hr />
  </span>
</template>

<script>
import NounPhrase from "./NounPhrase.vue";
import Adjectives from "../assets/adjectives.json";

export default {
  name: "Predicate",
  props: {
    allVerbs: Array,
    allObjects: Array
  },
  data: function() {
    return {
      allAdjectives: Adjectives,
      objects: [],
      verb: {},
      mode: "view"
    };
  },
  methods: {
    updatePredicate: function() {
      this.$emit("predicateUpdate", { verb: this.verb, objects: this.objects });
    },
    updateObject: function(objects) {
      this.objects = objects;
      this.updatePredicate();
    },
    validObjects: function(type) {
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
    },
    toggleMode: function() {
      this.mode = this.mode === "view" ? "edit" : "view";
    }
  },
  computed: {
    toJSON: function() {
      return { verb: this.verb, objects: this.objects };
    }
  },
  watch: {
    verb: function() {
      this.updatePredicate();
      this.toggleMode();
    },
    objects: function() {
      this.updatePredicate();
    }
  },
  components: {
    NounPhrase
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.verb {
  border-color: #42b983;
  border-style: dotted;
}
</style>
