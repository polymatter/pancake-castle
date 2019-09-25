<!-- Represents Editing a specific word baesd on category -->
<template>
  <div class="category" v-on:click="toggleMode">
    <slot v-if="mode === 'view'"></slot>
    <template v-if="mode === 'edit'">
      <select v-model="categories" v-on:click.stop multiple>
        <option
          v-for="category in remainingCategories"
          v-bind:key="category"
          v-on:click.stop
        >{{category}}</option>
      </select>
      <select v-model="words" v-on:click.stop multiple>
        <option
          v-for="word in remainingWords"
          v-bind:key="word.key"
          v-bind:value="word"
          v-on:click="wordUpdate(word)"
        >{{word.value}}</option>
      </select>
    </template>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    initialWords: Array,
    updateEventName: String
  },
  data: function() {
    return {
      words: [],
      categories: [],
      mode: "view"
    };
  },
  methods: {
    wordUpdate: function(word) {
      if (this.words.length > 1) {
        this.words = [word];
      }
      this.$emit("wordUpdate", { words: this.words });
    },
    toggleMode: function() {
      this.mode = this.mode === "view" ? "edit" : "view";
    }
  },
  computed: {
    remainingWords: function() {
      return this.categories.length === 0
        ? this.initialWords
        : this.initialWords.filter(
            w =>
              this.words.includes(w) ||
              this.categories.reduce(
                (matchesAllCategories, c) =>
                  matchesAllCategories && w.categories.includes(c),
                true
              )
          ).sort();
    },
    remainingCategories: function() {
      return this.initialWords.reduce(
        (categories, w) =>
          w.categories.reduce((categories, c) => {
            if (!categories.includes(c)) {
              categories.push(c);
            }
            return categories;
          }, categories),
        this.categories.map(a => a) //to make a copy of categories to modify
      ).sort();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category {
  border-color: black;
  border-style: solid;
}
/* .categories {} */
</style>
