<template>
  <div>
    <p>Elapsed: {{ elapsed }}</p>
    <p>Last 5s: {{ last5 }}</p>
    <p>Last 10s: {{ last10 }}</p>
    <p>Last 15s: {{ last15 }}</p>
    <ol>
      <li v-for="(item, index) in samples" :key="index">
        {{ index }} seconds ago, frames: {{ item }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "PerformanceBreakdown",
  props: {
    elapsed: Number,
    last5: Number,
    last10: Number,
    last15: Number,
    samples: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}
</style>
