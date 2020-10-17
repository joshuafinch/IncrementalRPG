<template>
  <Game />
</template>

<script lang="ts">
import Game from "components/Game";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    Game,
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
