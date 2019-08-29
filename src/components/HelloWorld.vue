<template>
  <div class="hello">
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
      <option>to sing</option>
      <option>to eat</option>
      <option>to wash</option>
      <option>to dance</option>
    </select>
    <hr/>
    {{ sentence }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      subjects: [],
      verb: "",
      verbConjugate: {
        "to sing": function(firstperson, plural) {
          let base = 'to sing'.replace('to ', '');
          let suffix = firstperson || plural ? '' : 's';
          return base + suffix;
        },
        "to eat": function(firstperson, plural) {
          let base = 'to eat'.replace('to ', '');
          let suffix = firstperson || plural ? '' : 's';
          return base + suffix;
        },
        "to wash": function(firstperson, plural) {
          let base = 'to wash'.replace('to ', '');
          let suffix = firstperson || plural ? '' : 's';
          return base + suffix;
        },
        "to dance": function(firstperson, plural) {
          let base = 'to dance'.replace('to ', '');
          let suffix = firstperson || plural ? '' : 's';
          return base + suffix;
        }
      }
    }
  },
  computed: {
    sentence: function() {
      if (this.subjects.length > 0 && this.verb.length > 0) {
        let firstperson = this.subjects[0] === "I" && this.subjects.length === 1;
        let plural = this.subjects.length > 1
        let _subjects = this.subjects;
        if (plural) {
          _subjects = this.subjects.map(s => s.replace(/^I$/, 'Me'));
        }
        return _subjects.join(' and ') + " " + this.verbConjugate[this.verb](firstperson, plural);
      } else {
        return "---"
      }
    }
  }
}
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
