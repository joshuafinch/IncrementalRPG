<template>
  <div class="home">
    <h1>Home</h1>
    <div class="nav">
      <router-link class="item" to="/about">About</router-link>
      <router-link class="item" to="/game">Game</router-link>
    </div>
  </div>
</template>

<style scoped>
.nav {
  flex-wrap: wrap;
}

.item {
  padding: 0 10px;
}
</style>
