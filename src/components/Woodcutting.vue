<template>
  <div>
    <p>Woodcutting</p>
    <p>Wood Cut: {{ woodCut }}</p>
    <p>{{ isCuttingWood ? "Cutting wood." : "Not cutting wood." }}</p>
    <button v-on:click="$emit('status-changed', !isCuttingWood)">
      {{ isCuttingWood ? "Stop cutting wood" : "Cut wood" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Woodcutting",
  emits: ["status-changed"],
  props: {
    woodCut: Number,
    isCuttingWood: Boolean,
  },
};
</script>
