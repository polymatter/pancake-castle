<!-- Represents Editing a specific Predicate -->
<template>
  <span class="predicate">
    <span class="verb" v-on:click="toggleMode">
      <slot v-if="mode === 'view'"></slot>
      <select v-model="verb" v-on:click.stop="" v-if="mode === 'edit'">
        <option
          v-for="verb in allVerbs"
          v-bind:key="verb.key"
          v-bind:value="verb"
        >{{verb.shortDescription || verb.key}}</option>
      </select>
    </span>
    <span class="objects" v-if="verb">
      <Argument
        v-if="verb && verb.directObject"
        v-bind:argument="objects"
        v-bind:type="'Object'"
        v-bind:allNouns="validObjects('directObject')"
        v-on:argumentUpdate="updateObject"
      ><slot name="directObject"></slot></Argument>
    </span>
    <hr />
  </span>
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
    Argument
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
