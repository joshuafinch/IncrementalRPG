<template>
  <div>
    <p>Woodcutting</p>
    <p>Wood Count: {{ woodCount }}</p>
    <p>{{ isCuttingWood ? "Cutting wood." : "Not cutting wood." }}</p>
    <button
      @click="
        isCuttingWood ? stopAction('CUTTING_WOOD') : startAction('CUTTING_WOOD')
      "
    >
      {{ isCuttingWood ? "Stop cutting wood" : "Cut wood" }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "Woodcutting",
  computed: {
    ...mapGetters(["woodCount", "isCuttingWood"]),
  },
  methods: {
    ...mapActions(["startAction", "stopAction"]),
  },
});
</script>
