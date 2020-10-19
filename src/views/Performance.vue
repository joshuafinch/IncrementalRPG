<template>
  <div>
    <h1>Performance</h1>
    <div class="Performance__wrapper">
      <PerformanceBreakdown
        name="FPS"
        :elapsed="elapsedSeconds"
        :last5="last5frames"
        :last10="last10frames"
        :last15="last15frames"
        :samples="frameSamples"
      />
      <PerformanceBreakdown
        name="TPS"
        :elapsed="elapsedTicks"
        :last5="last5ticks"
        :last10="last10ticks"
        :last15="last15ticks"
        :samples="tickSamples"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PerformanceBreakdown from "components/game/PerformanceBreakdown";
import GameLoop from "@/gameLoop";
import { defineComponent, ref, computed, Ref, unref, inject } from "vue";

export default defineComponent({
  components: {
    PerformanceBreakdown,
  },
  setup() {
    const gameLoop = inject<GameLoop>("gameLoop");
    if (!gameLoop) return;

    const average = (
      numSamples: number,
      offset: number,
      samples: number[] | Ref<number[]>
    ) => {
      let filteredSamples = unref(samples)
        .slice(offset, offset + numSamples)
        .filter((v) => v > 0);
      if (filteredSamples.length < numSamples) return 0;
      return filteredSamples.reduce((s, v) => s + v) / filteredSamples.length;
    };

    return {
      showFrameBreakdown: ref(true),
      showTickBreakdown: ref(true),
      last5ticks: computed(() => average(5, 1, gameLoop.tickSamples)),
      last10ticks: computed(() => average(10, 1, gameLoop.tickSamples)),
      last15ticks: computed(() => average(15, 1, gameLoop.tickSamples)),
      tickSamples: gameLoop.tickSamples,
      last5frames: computed(() => average(5, 1, gameLoop.frameSamples)),
      last10frames: computed(() => average(10, 1, gameLoop.frameSamples)),
      last15frames: computed(() => average(15, 1, gameLoop.frameSamples)),
      frameSamples: gameLoop.frameSamples,
    };
  },
});
</script>

<style scoped>
.Performance__wrapper {
  display: flex;
  flex-flow: row wrap;
}
.Performance__wrapper > * {
  flex: 1;
  align-self: flex-start;
}
</style>
