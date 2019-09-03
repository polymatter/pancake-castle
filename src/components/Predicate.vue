<!-- Represents Editing a specific Predicate -->
<template>
  <div class="predicate">
    <h1>Predicate</h1>
    <h2>Verb</h2>
    <select v-model="verb">
      <option v-for="verb in allVerbs" v-bind:key="verb.key" v-bind:value="verb">{{verb.infinitive}}</option>
    </select>
    <br />
    <div class="objects" v-if="verb">
      <Argument
        v-if="verb && verb.directObject"
        v-bind:argument="objects"
        v-bind:type="'Object'"
        v-bind:allNouns="validObjects('directObject')"
        v-on:argumentUpdate="updateObject"
      />
    </div>
    <hr />
  </div>
</template>

<script>
import Argument from "./Argument.vue";

export default {
  name: "Predicate",
  props: {
    allVerbs: Array,
    allObjects: Array
  },
  data: function() {
    return {
      objects: undefined,
      verb: undefined
    };
  },
  methods: {
    updatePredicate: function() {
      this.$emit("predicateUpdate", { verb: this.verb, objects: this.objects });
    },
    updateObject: function(objects) {
      this.objects = objects;
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
    },
    objects: function() {
      this.updatePredicate();
    }
  },
  components: {
    Argument
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
