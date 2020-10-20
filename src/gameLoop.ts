import {
  ACTION_GATHER_STONE,
  ACTION_GATHER_WOOD,
  MILLIS_IN_SECOND,
  MS_PER_TICK,
  RESOURCE_ID_STONE,
  RESOURCE_ID_WOOD,
  SAMPLE_BUFFER_SIZE,
  TICKS_PER_STONE,
  TICKS_PER_WOOD,
} from "./constants";
import store from "@/store";
import { Ref, ref } from "vue";

export default class GameLoop {
  frameSamples: Ref<number[]>;
  tickSamples: Ref<number[]>;
  oldTimeStamp: Ref<number>;
  elapsedSeconds: Ref<number>;
  elapsedTicks: Ref<number>;
  private raf?: number;
  private id: number;
  private static latestId: number = 0;
  static readonly instance: GameLoop = new GameLoop();

  constructor() {
    this.frameSamples = ref(new Array(SAMPLE_BUFFER_SIZE).fill(0));
    this.tickSamples = ref(new Array(SAMPLE_BUFFER_SIZE).fill(0));
    this.oldTimeStamp = ref(0);
    this.elapsedSeconds = ref(0);
    this.elapsedTicks = ref(0);
    this.id = GameLoop.latestId++;
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
    console.info(`Starting GameLoop ${this.id} at ${startTime}`);

    this.oldTimeStamp.value = startTime;
    this.elapsedSeconds.value = startTime / MILLIS_IN_SECOND;
    this.elapsedTicks.value = Math.round(startTime / MS_PER_TICK);
    this.frameSamples.value.fill(0);
    this.tickSamples.value.fill(0);

    this.loop(startTime);
  }

  stop() {
    if (this.raf) {
      console.info(`Stopping GameLoop ${this.id} at ${performance.now()}`);
      cancelAnimationFrame(this.raf);
    } else {
      console.info(
        `Attempted to stop GameLoop ${
          this.id
        }, but nothing to stop at ${performance.now()}`
      );
    }
  }

  doSeconds(numSeconds: number) {
    const shiftSamples = (numSeconds: number, samples: Ref<number[]>) => {
      if (numSeconds > samples.value.length) {
        samples.value.fill(0);
        return;
      }

      for (var i = 0; i < numSeconds; i++) {
        samples.value.pop();
        samples.value.unshift(0);
      }
    };

    shiftSamples(numSeconds, this.frameSamples);
    shiftSamples(numSeconds, this.tickSamples);
  }

  doTicks(numTicks: number) {
    this.tickSamples.value[0] = this.tickSamples.value[0] + numTicks;

    if (store.getters[`IS_${ACTION_GATHER_WOOD}`]) {
      store.dispatch("incrementProgressTowardsBy", {
        item: RESOURCE_ID_WOOD,
        amount: numTicks,
        progressPerItem: TICKS_PER_WOOD,
      });
    }

    if (store.getters[`IS_${ACTION_GATHER_STONE}`]) {
      store.dispatch("incrementProgressTowardsBy", {
        item: RESOURCE_ID_STONE,
        amount: numTicks,
        progressPerItem: TICKS_PER_STONE,
      });
    }
  }
}
