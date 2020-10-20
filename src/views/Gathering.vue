<template>
  <div>
    <h1>Gathering</h1>
    <div v-for="resource in resources" :key="resource.id">
      <Resource :action="resource.action" :resourceId="resource.id" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ACTION_GATHER_STONE,
  ACTION_GATHER_WOOD,
  RESOURCE_ID_STONE,
  RESOURCE_ID_WOOD,
} from "@/constants";
import Resource from "components/game/Resource";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Resource,
  },
  setup() {
    return {
      resources: [
        {
          id: RESOURCE_ID_WOOD,
          action: ACTION_GATHER_WOOD,
        },
        {
          id: RESOURCE_ID_STONE,
          action: ACTION_GATHER_STONE,
        },
      ],
    };
  },
});
</script>
