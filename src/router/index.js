import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Home from "../views/Home.vue"
import GroupManagement from "../views/GroupManagement.vue"
import NewGroup from "../views/NewGroup.vue"
import Registered from "../views/Registered.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;