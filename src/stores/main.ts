// src/stores/main.ts
import { defineStore } from "pinia";
// Import the JSON files directly
import article1 from "../../public/articles/article1.json";
import article2 from "../../public/articles/article2.json";
import article3 from "../../public/articles/article3.json";
import article4 from "../../public/articles/article4.json";
import article5 from "../../public/articles/article5.json";
import article6 from "../../public/articles/article6.json";
import article7 from "../../public/articles/article7.json";
import article8 from "../../public/articles/article8.json";
import article9 from "../../public/articles/article9.json";
import article10 from "../../public/articles/article10.json";
import article11 from "../../public/articles/article11.json";

export const useMainStore = defineStore("main", {
  state: () => ({
    articles: [
      article1,
      article2,
      article3,
      article4,
      article5,
      article6,
      article7,
      article8,
      article9,
      article10,
      article11,
    ] as any[], // Type assertion for simplicity
  }),
  actions: {
    upvoteArticle(articleId: number) {
      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        article.upvotes = (article.upvotes || 0) + 1; // Ensure upvotes exists
      }
    },
    downvoteArticle(articleId: number) {
      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        article.downvotes = (article.downvotes || 0) + 1;
      }
    },
    toggleBookmark(articleId: number) {
      //TODO: implement later
      console.log("bookmark toggled", articleId);
    },
  },
});
