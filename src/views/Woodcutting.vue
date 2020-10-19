<template>
  <div>
    <h1>Woodcutting</h1>
    <WoodcuttingResource />
  </div>
</template>

<script lang="ts">
import WoodcuttingResource from "components/game/WoodcuttingResource";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    WoodcuttingResource,
  },
});
</script>
