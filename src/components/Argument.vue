<!-- Represents Editing a specific Predicate Argument -->
<template>
  <div class="argument">
    <h1 v-if="type">{{type}}</h1>
    <h1 v-if="!type">Argument</h1>
    <select v-model="nouns" multiple>
      <option v-for="noun in allNouns" v-bind:key="noun.key" v-bind:value="noun">{{noun.value}}</option>
    </select>
  </div>
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
      nouns: []
    };
  },
  methods: {
    argumentUpdate: function() {
      this.$emit("argumentUpdate", { nouns: this.nouns });
    }
  },
  watch: {
    nouns: function() {
      this.argumentUpdate();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
