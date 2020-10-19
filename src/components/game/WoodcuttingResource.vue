<template>
  <div
    class="resource"
    @click="
      isCuttingWood ? stopAction('CUTTING_WOOD') : startAction('CUTTING_WOOD')
    "
  >
    <p>Wood Count: {{ woodCount }}</p>
    <p>{{ isCuttingWood ? "Cutting wood..." : "Not cutting wood." }}</p>
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

<style scoped>
.resource {
  border: 1px solid;
  border-radius: 10px;
  max-width: 30ch;
  margin: 1em;
  padding: 1em;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
}
</style>
