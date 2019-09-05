<!-- Represents Editing a specific Predicate Argument -->
<template>
  <span class="argument" v-on:click="toggleMode">
    <slot v-if="mode === 'view'"></slot>
    <template v-if="mode === 'edit'">
      <select v-model="nouns" v-on:click.stop v-on:change="argumentUpdate" multiple>
        <option v-for="noun in allNouns" v-bind:key="noun.key" v-bind:value="noun">{{noun.value}}</option>
      </select>
      <button v-on:click.stop="toggleMode">/</button>
      <button v-on:click.stop="toggleMode">X</button>
    </template>
  </span>
</template>

<script>
export default {
  name: "Argument",
  props: {
    allNouns: Array,
    type: String
  },
  data: function() {
    return {
      nouns: [],
      mode: "view"
    };
  },
  methods: {
    argumentUpdate: function() {
      this.$emit("argumentUpdate", { nouns: this.nouns });
    },
    toggleMode: function() {
      this.mode = this.mode === "view" ? "edit" : "view";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.argument {
  border-color: coral;
  border-style: dotted;
}
</style>
