import { MILLIS_IN_SECOND, MS_PER_TICK } from "./constants";

export default class GameLoop {
  constructor() {
    this.frameSamples = new Array(16).fill(0);
    this.tickSamples = new Array(16).fill(0);
    this.oldTimeStamp = 0;
    this.elapsedSeconds = 0;
    this.elapsedTicks = 0;

    this.isCuttingWood = false;
    this.wood = 0;
  }

  loop(timeStamp) {
    requestAnimationFrame((timeStamp) => this.loop(timeStamp));

    this.oldTimeStamp = timeStamp;

    // Measure a new frame
    this.frameSamples[0] = this.frameSamples[0] + 1;

    // Process full elapsed seconds passed since last loop
    let newElapsedSeconds = Math.round(this.oldTimeStamp / MILLIS_IN_SECOND);
    let secondsToProcess = newElapsedSeconds - this.elapsedSeconds;
    if (secondsToProcess > 0) {
      this.doSeconds(secondsToProcess);
    }
    this.elapsedSeconds = newElapsedSeconds;

    // Process full elapsed ticks passed since last loop
    let newElapsedTicks = Math.round(this.oldTimeStamp / MS_PER_TICK);
    let ticksToProcess = newElapsedTicks - this.elapsedTicks;
    if (ticksToProcess > 0) {
      this.doTicks(ticksToProcess);
    }
    this.elapsedTicks = newElapsedTicks;

    // Every frame we wish to render any updated graphics
    this.doRender();
  }

  doSeconds(numSeconds) {
    this.shiftFrameSamples(numSeconds);
    this.shiftTickSamples(numSeconds);
  }

  doTicks(numTicks) {
    this.tickSamples[0] = this.tickSamples[0] + numTicks;

    if (this.isCuttingWood) {
      this.wood += numTicks;
    }
  }

  doRender() {}

  shiftFrameSamples(numSeconds) {
    if (numSeconds > this.frameSamples.length) {
      this.frameSamples.fill(0);
      return;
    }

    for (var i = 0; i < numSeconds; i++) {
      this.frameSamples.pop();
      this.frameSamples.unshift(0);
    }
  }

  shiftTickSamples(numSeconds) {
    if (numSeconds > this.tickSamples.length) {
      this.tickSamples.fill(0);
      return;
    }

    for (var i = 0; i < numSeconds; i++) {
      this.tickSamples.pop();
      this.tickSamples.unshift(0);
    }
  }

  averageFrames(numSamples, offset) {
    let frames = this.frameSamples
      .slice(offset, offset + numSamples)
      .filter((v) => v > 0);
    if (frames.length < numSamples) return 0;
    return frames.reduce((s, v) => s + v) / frames.length;
  }

  averageTicks(numSamples, offset) {
    let ticks = this.tickSamples
      .slice(offset, offset + numSamples)
      .filter((v) => v > 0);
    if (ticks.length < numSamples) return 0;
    return ticks.reduce((s, v) => s + v) / ticks.length;
  }
}
