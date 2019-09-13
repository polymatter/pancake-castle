<!-- Represents Editing a specific Predicate Argument -->
<template>
  <span class="words" v-on:click="toggleMode">
    <slot v-if="mode === 'view'"></slot>
    <template v-if="mode === 'edit'">
      <slot name="modifier"></slot>
      <select v-model="words" v-on:click.stop v-on:change="wordUpdate" multiple>
        <option v-for="word in allWords" v-bind:key="word.key || word" v-bind:value="word">{{word.value || word}}</option>
      </select>
      <button class="confirm" v-on:click.stop="toggleMode">✓</button>
      <button class="cancel" v-on:click.stop="toggleMode">X</button>
    </template>
  </span>
</template>

<script>

export default {
  name: "SelectWord",
  props: {
    allWords: Array,
    eventName: String
  },
  data: function() {
    return {
      words: [],
      mode: "view"
    };
  },
  computed: {
  },
  methods: {
    wordUpdate: function() {
      this.$emit(this.eventName || "wordUpdate", this.words);
    },
    toggleMode: function() {
      this.mode = this.mode === "view" ? "edit" : "view";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.words {
  border-color: blue;
  border-style: double;
}
</style>
