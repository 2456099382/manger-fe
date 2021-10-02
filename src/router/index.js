import { createRouter, createWebHashHistory } from "vue-router";
const Home = () => import("../views/Home/index.vue");
const Welcome = () => import("../views/Welcome/index.vue");
const Login = () => import("../views/Login/index.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {},
    redirect: "/welcome",
    children: [
      {
        name: "Login",
        path: "/login",
        component: Login,
        meta: {},
      },
      {
        name: "Welcome",
        path: "/welcome",
        component: Welcome,
        meta: {},
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
