<!-- Represents Editing a specific Predicate -->
<template>
  <div class="predicate">
    <h1>Subject</h1>
    <select v-model="subjects" multiple>
      <option>I</option>
      <option>Jeffrey</option>
      <option>Trish</option>
      <option>Catherine</option>
      <option>John</option>
    </select>
    <h1>Predicate</h1>
    <h2>Verb</h2>
    <select v-model="verb">
      <option
        v-for="verb in allVerbs"
        v-bind:key="verb.infinitive"
        v-bind:value="verb"
      >{{verb.infinitive}}</option>
    </select>
    <hr />
    {{ sentence }}
  </div>
</template>

<script>
export default {
  name: "Predicate",
  props: {
    allVerbs: Array,
    conjugateVerb: Function
  },
  data: function() {
    return {
      subjects: [],
      verb: undefined
    };
  },
  watch: {
    verb: function(newVerb) {
      this.$emit("predicateUpdate", newVerb);
    }
  },
  computed: {
    sentence: function() {
      if (this.subjects.length > 0 && this.verb) {
        let firstperson =
          this.subjects[0] === "I" && this.subjects.length === 1;
        let plural = this.subjects.length > 1;
        let _subjects = this.subjects;
        if (plural) {
          _subjects = this.subjects.map(s => s.replace(/^I$/, "Me"));
        }
        return (
          _subjects.join(" and ") +
          " " +
          this.conjugateVerb(this.verb, { firstperson, plural })
        );
      } else {
        return "---";
      }
    }
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
