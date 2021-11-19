import { createRouter, createWebHashHistory } from "vue-router";
const Home = () => import("../views/Home/index.vue");
const Welcome = () => import("../views/Welcome/index.vue");
const Login = () => import("../views/Login/index.vue");
const System = () => import("../views/System/index.vue");
const UserManager = () => import("../views/System/UserManager/index.vue");
const MenuManager = () => import("../views/System/MenuManager/index.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      label: "首页",
    },
    redirect: "/welcome",
    children: [
      {
        name: "Welcome",
        path: "welcome",
        component: Welcome,
        meta: {
          label: "欢迎页",
        },
      },
      {
        name: "System",
        path: "system",
        component: System,
        redirect: "/system/user",
        hide: true,
        meta: {
          label: "系统管理",
        },
        children: [
          {
            name: "UserManager",
            path: "user",
            component: UserManager,
            meta: {
              label: "用户管理",
            },
          },
          {
            name: "MenuManager",
            path: "menu",
            component: MenuManager,
            meta: {
              label: "菜单管理",
            },
          },
          {
            name: "RoleManager",
            path: "role",
            component: () => import("@/views/System/RoleManager/index.vue"),
            meta: {
              label: "角色管理",
            },
          },
        ],
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {},
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
