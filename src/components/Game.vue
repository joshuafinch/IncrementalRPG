<template>
  <div>
    <Woodcutting
      @status-changed="onStatusChanged"
      :woodCut="gameLoop.wood"
      :isCuttingWood="gameLoop.isCuttingWood"
    />

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

<script>
import PerformanceBreakdown from "./PerformanceBreakdown";
import Woodcutting from "./Woodcutting";
import GameLoop from "../gameLoop";

export default {
  name: "Game",
  components: {
    Woodcutting,
    PerformanceBreakdown,
  },
  mounted() {
    this.gameLoop.loop(0);
  },
  data() {
    return {
      showFrameBreakdown: false,
      showTickBreakdown: false,
      gameLoop: new GameLoop(),
    };
  },
  methods: {
    onStatusChanged: function(isCuttingWood) {
      this.gameLoop.isCuttingWood = isCuttingWood;
    },
  },
};
</script>
