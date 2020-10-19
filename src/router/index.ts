import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "views/Home";
import About from "views/About";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/game",
    redirect: "/game/inventory",
    name: "Game",
    component: () => import(/* webpackChunkName: "game" */ "views/Game"),
    children: [
      {
        path: "woodcutting",
        component: () =>
          import(/* webpackChunkName: "game" */ "views/Woodcutting"),
      },
      {
        path: "performance",
        component: () =>
          import(/* webpackChunkName: "game" */ "views/Performance"),
      },
      {
        path: "combat",
        component: () => import(/* webpackChunkName: "game" */ "views/Combat"),
      },
      {
        path: "inventory",
        component: () =>
          import(/* webpackChunkName: "game" */ "views/Inventory"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
