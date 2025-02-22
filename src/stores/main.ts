// src/stores/main.ts
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    articles: [] as any[], // Start with an empty array!
  }),
  actions: {
    upvoteArticle(articleId: number) {
      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        article.upvotes = (article.upvotes || 0) + 1;
      }
    },
    downvoteArticle(articleId: number) {
      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        article.downvotes = (article.downvotes || 0) + 1;
      }
    },
    likeArticle(articleId: number) {
      // Add like action
      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        article.likes = (article.likes || 0) + 1;
      }
    },
    toggleBookmark(articleId: number) {
      // TODO: Implement bookmarking logic (likely requires a backend)
      console.log("bookmark toggled", articleId);
    },

    // *** Async action to fetch articles ***
    async fetchArticles() {
      try {
        const articleFiles = [
          "article1.json",
          "article2.json",
          "article3.json",
          "article4.json",
          "article5.json",
          "article6.json",
          "article7.json",
          "article8.json",
          "article9.json",
          "article10.json",
          "article11.json",
        ];

        // Use Promise.all to fetch all files concurrently
        const responses = await Promise.all(
          articleFiles.map((file) => fetch(`/articles/${file}`)) // Correct path!
        );
        const articlesData = await Promise.all(
          responses.map((res) => res.json())
        );

        this.articles = articlesData; // Assign the fetched data to the state
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Handle the error appropriately (e.g., show an error message)
      }
    },
  },
});
