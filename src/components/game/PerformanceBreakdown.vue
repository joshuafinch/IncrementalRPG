<template>
  <div class="breakdown" @click="toggleShowBreakdown()">
    <h1>{{ name }}: {{ last5.toFixed(2) }}</h1>
    <div v-if="showBreakdown">
      <p>10s: {{ last10.toFixed(2) }} - 15s: {{ last15.toFixed(2) }}</p>
      <ol>
        <li v-for="(item, index) in samples" :key="index">
          <span class="left">{{ index }} seconds ago:</span>
          <span class="right">{{ item.toFixed(2) }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PerformanceBreakdown",
  props: {
    name: String,
    last5: Number,
    last10: Number,
    last15: Number,
    samples: Array,
  },
  setup() {
    var showBreakdown = ref(false);

    function toggleShowBreakdown() {
      showBreakdown.value = !showBreakdown.value;
    }

    return {
      showBreakdown,
      toggleShowBreakdown,
    };
  },
});
</script>

<style scoped>
.breakdown {
  border: 1px solid;
  border-radius: 10px;
  max-width: 30ch;
  margin: 1em;
  padding: 1em;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
}

ol {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  font-variant-numeric: tabular-nums;
  justify-content: space-between;
  padding: 0 10px;
}

.left {
  text-align: right;
  padding: 0 10px;
}

.right {
  text-align: right;
  width: 6ch;
  font-family: "Courier New", Courier, monospace;
}
</style>
