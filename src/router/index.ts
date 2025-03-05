import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import HomePage from "../views/HomePage.vue";
import UploadPage from "../views/UploadPage.vue";
import ArticleDetailsPage from "../views/ArticleDetailsPage.vue";
import UserTypePage from "../views/UserTypePage.vue";
import DatasetUploadPage from "../views/DatasetUploadPage.vue";
import ResearcherDashboardPage from "../views/ResearcherDashboardPage.vue";
import TrainingConsolePage from "../views/TrainingConsolePage.vue";

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
      component: HomePage,
    },
    {
      path: "/article/:id",
      name: "article-details",
      component: ArticleDetailsPage,
      props: true,
    },
    {
      path: "/user-type",
      name: "user-type",
      component: UserTypePage,
    },
    {
      path: "/dataset-upload",
      name: "dataset-upload",
      component: DatasetUploadPage,
    },
    {
      path: "/researcher-dashboard", // NEW
      name: "researcher-dashboard",
      component: ResearcherDashboardPage,
    },
    {
      path: "/training/:modelId",
      name: "training-console",
      component: TrainingConsolePage,
      props: true,
    },
  ],
});

export default router;
