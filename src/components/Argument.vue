<!-- Represents Editing a specific Predicate Argument -->
<template>
  <div class="argument">
    <h1 v-if="isSubject">Subject</h1>
    <h1 v-if="!isSubject">Argument</h1>
    <select v-model="elements" v-on:change="argumentUpdate" multiple>
      <option
        v-for="element in allElements"
        v-bind:key="element.key"
        v-bind:value="element"
      >{{element.value}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Argument",
  props: {
    allElements: Array,
    isSubject: Boolean
  },
  data: function() {
    return {
      elements: []
    };
  },
  methods: {
    argumentUpdate: function() {
      this.$emit("argumentUpdate", this.elements);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
