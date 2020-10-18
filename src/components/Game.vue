<template>
  <div>
    <Woodcutting />

    <PerformanceBreakdown
      v-if="showFrameBreakdown"
      :elapsed="gameLoop.elapsedSeconds"
      :last5="gameLoop.averageFrames(5, 1)"
      :last10="gameLoop.averageFrames(10, 1)"
      :last15="gameLoop.averageFrames(15, 1)"
      :samples="gameLoop.frameSamples"
    />
    <PerformanceBreakdown
      v-if="showTickBreakdown"
      :elapsed="gameLoop.elapsedTicks"
      :last5="gameLoop.averageTicks(5, 1)"
      :last10="gameLoop.averageTicks(10, 1)"
      :last15="gameLoop.averageTicks(15, 1)"
      :samples="gameLoop.tickSamples"
    />
  </div>
</template>

<script lang="ts">
import PerformanceBreakdown from "components/PerformanceBreakdown";
import Woodcutting from "components/Woodcutting";
import GameLoop from "@/gameLoop";
import { defineComponent, onMounted, ref, reactive } from "vue";

export default defineComponent({
  name: "Game",
  components: {
    PerformanceBreakdown,
    Woodcutting,
  },
  setup() {
    const gameLoop = reactive(new GameLoop());
    let showFrameBreakdown = ref(false);
    let showTickBreakdown = ref(false);

    onMounted(() => {
      gameLoop.loop(0);
    });

    return {
      showFrameBreakdown,
      showTickBreakdown,
      gameLoop,
    };
  },
});
</script>
