<!-- Represents Editing a specific Predicate Argument -->
<template>
  <div class="argument">
    <h1 v-if="isSubject">Subject</h1>
    <h1 v-if="!isSubject">Argument</h1>
    <select v-model="nouns" v-on:change="argumentUpdate" multiple>
      <option v-for="noun in allNouns" v-bind:key="noun.key" v-bind:value="noun">{{noun.value}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Argument",
  props: {
    allNouns: Array,
    isSubject: Boolean
  },
  data: function() {
    return {
      nouns: []
    };
  },
  methods: {
    argumentUpdate: function() {
      this.$emit("argumentUpdate", this.nouns);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
