// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import HomePage from "../views/HomePage.vue";
import UploadPage from "../views/UploadPage.vue";
import ArticleDetailsPage from "../views/ArticleDetailsPage.vue";

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
      component: () => import("../views/HomePage.vue"), // Keep this
    },
    {
      path: "/article/:id", // Dynamic segment for article ID
      name: "article-details",
      component: ArticleDetailsPage, // Use the component
      props: true, // Pass the route params as props to the component
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/HomePage.vue"),
    },
  ],
});

export default router;
