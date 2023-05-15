import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Home from "../views/Home.vue"
import GroupManagement from "../views/GroupManagement.vue"
import NewGroup from "../views/NewGroup.vue"
import Registered from "../views/Registered.vue"
import Redemption from "../views/Redemption.vue"
import Game from "../views/Game.vue"

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/registered",
    name: "registered",
    component: Registered,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/groupmgmt",
    name: "groupmgmt",
    component: GroupManagement,
  },
  {
    path: "/newgroup",
    name: "newgroup",
    component: NewGroup,
  },
  {
    path: "/redemption",
    name: "redemption",
    component: Redemption,
  },
  {
    path: "/game",
    name: "game",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
