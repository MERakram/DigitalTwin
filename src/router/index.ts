import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import HomePage from "../views/HomePage.vue";
import UploadPage from "../views/UploadPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
      path: "/upload",
      name: "upload",
      component: UploadPage,
    },
    {
      path: "/articles",
      name: "articles",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/HomePage.vue"),
    },
  ],
});

export default router;
