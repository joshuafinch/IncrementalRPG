<template>
  <div class="wrapper">
    <div class="header">
      <h1>Game</h1>
    </div>
    <div class="sidebar">
      <router-link
        class="item"
        v-for="link in links"
        :key="link.name"
        :to="link.route"
      >
        {{ link.name }}
      </router-link>
    </div>
    <router-view class="main" />
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import GameLoop from "@/gameLoop";
import { defineComponent, onMounted, onUnmounted, provide } from "vue";

export default defineComponent({
  setup() {
    const gameLoop = GameLoop.instance;

    onMounted(() => {
      gameLoop.start();
    });

    onUnmounted(() => {
      gameLoop.stop();
    });

    provide<GameLoop>("gameLoop", gameLoop);

    return {
      links: [
        {
          name: "Inventory",
          route: "/game/inventory",
        },
        {
          name: "Combat",
          route: "/game/combat",
        },
        {
          name: "Gathering",
          route: "/game/gathering",
        },
        {
          name: "Performance",
          route: "/game/performance",
        },
      ],
    };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: row wrap;
}
.wrapper > * {
  flex: 1 100%;
}
.main {
  background: lightblue;
  align-self: flex-start;
}
.sidebar {
  flex-flow: column wrap;
  width: 30ch;
  display: flex;
  align-items: flex-start;
  background: lightpink;
  align-self: flex-start;
}
.sidebar .item {
  padding: 0.25em 0.25em;
  flex: 1 0px;
}

/* Medium screens */
@media all and (min-width: 600px) {
  /* We tell both sidebars to share a row */
  .sidebar {
    flex: 1 auto;
  }
}

/* Large screens */
@media all and (min-width: 800px) {
  .main {
    flex: 5 0px;
  }
  .sidebar {
    flex: 1 0px;
  }
  .sidebar {
    order: 1;
  }
  .main {
    order: 2;
  }
  .header {
    order: 0;
  }
  .footer {
    order: 3;
  }
}
</style>
