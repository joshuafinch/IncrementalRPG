<template>
  <div
    class="resource"
    @click="isGatheringResource ? stopAction(action) : startAction(action)"
  >
    <p>Count: {{ resourceCount }}</p>
    <p>Rate: {{ secondsPerResource }}s per {{ resourceId }}</p>
    <p>
      {{
        isGatheringResource
          ? `Gathering ${resourceId}... ${(
              progressToNextResource * 100
            ).toFixed(0)}%`
          : `Not gathering ${resourceId}.`
      }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    action: { type: String, required: true },
    resourceId: { type: String, required: true },
  },
  setup() {
    return {
      ...mapActions(["startAction", "stopAction"]),
    };
  },
  computed: {
    isGatheringResource(): boolean {
      return this.$store.getters[`IS_${this.action}`];
    },
    resourceCount(): number {
      return this.$store.getters[`${this.resourceId}Count`];
    },
    progressToNextResource(): number {
      return this.$store.getters[`${this.resourceId}ProgressToNext`];
    },
    secondsPerResource(): number {
      return this.$store.getters[`${this.resourceId}SecondsPer`];
    },
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
