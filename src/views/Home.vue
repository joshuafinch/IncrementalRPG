<template>
  <div class="home">
    <Game />
  </div>
</template>

<script lang="ts">
import Game from "components/Game";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    Game,
  },
});
</script>
