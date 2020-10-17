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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Woodcutting",
  props: {
    woodCut: { type: Number, required: true },
    isCuttingWood: { type: Boolean, required: true },
  },
  emits: ["status-changed"],
});
</script>
