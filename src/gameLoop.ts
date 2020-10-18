import { MILLIS_IN_SECOND, MS_PER_TICK } from "./constants";
import store from "@/store";
import { Ref, ref } from "vue";

export default class GameLoop {
  frameSamples: Ref<number[]>;
  tickSamples: Ref<number[]>;
  oldTimeStamp: Ref<number>;
  elapsedSeconds: Ref<number>;
  elapsedTicks: Ref<number>;
  raf?: number;
  id: number;

  constructor() {
    this.frameSamples = ref(new Array(16).fill(0));
    this.tickSamples = ref(new Array(16).fill(0));
    this.oldTimeStamp = ref(0);
    this.elapsedSeconds = ref(0);
    this.elapsedTicks = ref(0);
    this.id = performance.now();
  }

  loop(timeStamp: number) {
    this.raf = requestAnimationFrame((t) => this.loop(t));

    this.oldTimeStamp.value = timeStamp;

    // Measure a new frame
    this.frameSamples.value[0] = this.frameSamples.value[0] + 1;

    // Process full elapsed seconds passed since last loop
    let newElapsedSeconds = Math.round(
      this.oldTimeStamp.value / MILLIS_IN_SECOND
    );
    let secondsToProcess = newElapsedSeconds - this.elapsedSeconds.value;
    if (secondsToProcess > 0) {
      this.doSeconds(secondsToProcess);
    }
    this.elapsedSeconds.value = newElapsedSeconds;

    // Process full elapsed ticks passed since last loop
    let newElapsedTicks = Math.round(this.oldTimeStamp.value / MS_PER_TICK);
    let ticksToProcess = newElapsedTicks - this.elapsedTicks.value;
    if (ticksToProcess > 0) {
      this.doTicks(ticksToProcess);
    }
    this.elapsedTicks.value = newElapsedTicks;
  }

  start() {
    const startTime = performance.now();
    console.log(`Starting GameLoop ${this.id} at ${startTime}`);
    this.loop(startTime);
  }

  stop() {
    if (this.raf) {
      console.log(`Stopping GameLoop ${this.id} at ${performance.now()}`);
      cancelAnimationFrame(this.raf);
    } else {
      console.log(
        `Attempted to stop GameLoop ${
          this.id
        }, but nothing to stop at ${performance.now()}`
      );
    }
  }

  doSeconds(numSeconds: number) {
    this.shiftFrameSamples(numSeconds);
    this.shiftTickSamples(numSeconds);
  }

  doTicks(numTicks: number) {
    this.tickSamples.value[0] = this.tickSamples.value[0] + numTicks;

    if (store.getters.isCuttingWood) {
      store.dispatch("incrementInventoryItemBy", {
        item: "wood",
        amount: numTicks,
      });
    }
  }

  shiftFrameSamples(numSeconds: number) {
    if (numSeconds > this.frameSamples.value.length) {
      this.frameSamples.value.fill(0);
      return;
    }

    for (var i = 0; i < numSeconds; i++) {
      this.frameSamples.value.pop();
      this.frameSamples.value.unshift(0);
    }
  }

  shiftTickSamples(numSeconds: number) {
    if (numSeconds > this.tickSamples.value.length) {
      this.tickSamples.value.fill(0);
      return;
    }

    for (var i = 0; i < numSeconds; i++) {
      this.tickSamples.value.pop();
      this.tickSamples.value.unshift(0);
    }
  }
}
