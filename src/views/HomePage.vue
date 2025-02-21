// src/views/HomePage.vue
<script setup lang="ts">
import { useMainStore } from "../stores/main";
import Logo from "../components/Logo.vue";
import TrendingSidebar from "../components/TrendingSidebar.vue";
import { ref, computed } from "vue";
import {
  ArrowUpCircle,
  Heart,
  Bookmark,
  Search,
  MessageCircle, // For comments
  MoreHorizontal, // "..." icon
} from "lucide-vue-next";
import { useRouter } from "vue-router";

const store = useMainStore();
const router = useRouter(); // Get router instance

const categories = [
  "All",
  "Natural Language Processing",
  "Computer Vision",
  "Machine Learning",
  "Data Analytics",
  "Robotics",
  "Cloud AI",
];

const selectedCategory = ref("All");
const searchQuery = ref("");

const handleCategoryClick = (category: string) => {
  selectedCategory.value = category;
};

const filteredArticles = computed(() => {
  let articles = store.articles;

  if (selectedCategory.value !== "All") {
    articles = articles.filter(
      (article) => article.category === selectedCategory.value
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.preview.toLowerCase().includes(query)
    );
  }

  return articles;
});

// Placeholder functions (replace with actual Pinia actions)
const toggleBookmark = (articleId: number) => {
  store.toggleBookmark(articleId);
};
const upvote = (articleId: number) => {
  store.upvoteArticle(articleId);
};
const downvote = (articleId: number) => {
  store.downvoteArticle(articleId);
};
const like = (articleId: number) => {
  store.likeArticle(articleId);
};

// Function to navigate to article details page.  IMPORTANT!
const goToArticleDetails = (articleId: number) => {
  router.push({ name: "article-details", params: { id: articleId } }); // Use named route
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="px-6 py-4 bg-white border-b">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <div class="flex gap-4">
          <router-link to="/upload" class="btn-secondary"
            >Upload Article</router-link
          >
        </div>
      </div>
    </nav>

    <div class="border-b bg-white">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex gap-6 overflow-x-auto pb-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="handleCategoryClick(category)"
            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-purple-50 hover:text-purple-900 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            :class="{
              'bg-purple-100 text-purple-900': category === selectedCategory,
            }"
          >
            {{ category }}
          </button>
        </div>
        <!-- Search Bar -->
        <div class="mt-4">
          <div class="relative w-full">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <Search class="w-5 h-5 text-gray-500" />
            </div>
            <input
              v-model="searchQuery"
              type="search"
              id="search"
              class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search articles..."
            />
          </div>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex gap-8">
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-8">Latest AI Solutions</h1>

          <div class="grid gap-6">
            <!-- Article Card -->
            <div
              v-for="article in filteredArticles"
              :key="article.id"
              class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              @click="goToArticleDetails(article.id)"
            >
              <div class="flex flex-col md:flex-row">
                <!-- Left side (content) -->
                <div class="p-4 md:w-2/3">
                  <div class="flex items-center text-xs text-gray-500 mb-2">
                    <!-- Assuming you have user avatars. Replace with your actual path -->
                    <img
                      :src="article.authorAvatar || '/default-avatar.png'"
                      alt="Author Avatar"
                      class="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{{ article.author }}</span>
                  </div>
                  <h2 class="text-2xl font-bold mb-2">{{ article.title }}</h2>
                  <p class="text-gray-600 mb-4">{{ article.preview }}</p>
                  <div class="flex items-center text-xs text-gray-500 mb-2">
                    <span v-if="article.releaseDate" class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4 mr-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {{ article.releaseDate }}
                    </span>
                    <span
                      v-if="article.upvotes !== undefined"
                      class="ml-4 flex items-center"
                    >
                      <ArrowUpCircle class="h-4 w-4 mr-1" />
                      {{ article.upvotes }}
                    </span>
                    <span
                      v-if="article.likes !== undefined"
                      class="ml-4 flex items-center"
                    >
                      <Heart class="h-4 w-4 mr-1" />
                      {{ article.likes }}
                    </span>
                    <span
                      v-if="article.comments !== undefined"
                      class="ml-4 flex items-center"
                    >
                      <MessageCircle class="w-4 h-4 mr-1" />
                      {{ article.comments }}
                    </span>
                  </div>

                  <!-- Price (Conditional Display) -->
                  <div
                    v-if="article.isOnSale && article.originalPrice"
                    class="text-sm"
                  >
                    <span class="text-gray-500 line-through mr-2"
                      >${{ article.originalPrice }}</span
                    >
                    <span class="text-red-500 font-bold"
                      >${{ article.price }}</span
                    >
                  </div>
                  <div v-else class="text-lg font-bold text-purple-900">
                    ${{ article.price }}
                  </div>
                </div>
                <!-- Right side (Image) -->
                <div class="md:w-1/3 flex-shrink-0">
                  <img
                    :src="
                      article.imageUrl || './src/assets/images/advanced.png'
                    "
                    :alt="article.title"
                    class="w-full h-48 object-cover rounded-tr-xl rounded-br-xl md:rounded-bl-none md:rounded-r-xl"
                  />
                </div>
              </div>
              <!-- Action Buttons (Bottom Right) -->
              <div class="absolute bottom-2 right-2 flex space-x-2">
                <button
                  @click.stop="toggleBookmark(article.id)"
                  class="p-1 rounded-full hover:bg-gray-100"
                >
                  <Bookmark class="h-4 w-4 text-gray-600" />
                </button>
                <button @click.stop class="p-1 rounded-full hover:bg-gray-100">
                  <MoreHorizontal class="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </main>
  </div>
</template>
