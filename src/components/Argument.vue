<!-- Represents Editing a specific Predicate Argument -->
<template>
  <div class="argument">
    <h1>Argument</h1>
    <select v-model="elements" multiple>
      <option v-for="element in allElements" v-bind:key="element.key" v-bind:value="element.value">
          {{element.value}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Argument',
  props: {
    allElements: Array
  },
  data: function() {
    return {
      elements: []
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
