<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, provide } from "vue";
import GameLoop from "@/gameLoop";

export default defineComponent({
  setup() {
    const gameLoop = new GameLoop();

    onMounted(() => {
      gameLoop.start();
    });

    onUnmounted(() => {
      gameLoop.stop();
    });

    provide<GameLoop>("gameLoop", gameLoop);
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
