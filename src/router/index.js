import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Home from "../views/Home.vue"
import GroupManagement from "../views/GroupManagement.vue"
import NewGroup from "../views/NewGroup.vue"

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
