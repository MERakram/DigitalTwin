<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useMainStore } from "../stores/main";
import Logo from "../components/Logo.vue";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Bookmark,
  MessageCircle,
} from "lucide-vue-next";
import katex from "katex"; // Import KaTeX for LaTeX rendering
import "katex/dist/katex.min.css"; // Import KaTeX CSS

const props = defineProps<{ id: string }>();
const store = useMainStore();

const article = computed(() => {
  const articleId = parseInt(props.id, 10);
  return store.articles.find((a) => a.id === articleId);
});

const getAvatarUrl = (author: string) => {
  const seed = author.replace(/\s+/g, "");
  return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&size=64`;
};

// Function to render LaTeX within the HTML content
const renderMath = (content: string) => {
  return content.replace(
    /<code class="language-latex">(.*?)<\/code>/g,
    (_, latex) => {
      return katex.renderToString(latex, { throwOnError: false });
    }
  );
};

const safeContent = computed(() =>
  article.value ? renderMath(article.value.content) : ""
);
</script>

<template>
  <div v-if="article">
    <nav class="px-6 py-4 bg-white border-b">
      <div class="max-w-[90rem] mx-auto flex justify-between items-center">
        <router-link :to="{ name: 'home' }">
          <Logo />
        </router-link>
      </div>
    </nav>
    <!-- Main Content Area -->
    <div class="max-w-4xl mx-auto px-6 py-8">
      <div class="flex items-center text-sm text-gray-500 mb-6">
        <img
          :src="getAvatarUrl(article.author)"
          :alt="article.author"
          class="w-8 h-8 rounded-full mr-2"
        />
        <span>{{ article.author }}</span>
        <span v-if="article.releaseDate" class="ml-4 flex items-center">
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
      </div>

      <h1 class="text-4xl font-bold mb-6">{{ article.title }}</h1>

      <img
        :src="article.imageUrl"
        :alt="article.title"
        class="w-full object-cover mb-8 rounded-lg"
      />

      <!-- Article Content with KaTeX rendering -->
      <div class="prose prose-lg" v-html="safeContent"></div>

      <!-- Upvote/Downvote/Comment Section -->
      <div class="flex items-center justify-start mt-8 space-x-6">
        <button
          @click="store.upvoteArticle(article.id)"
          class="flex items-center text-gray-600 hover:text-purple-600"
        >
          <ArrowUpCircle class="h-6 w-6 mr-1" />
          <span>{{ article.upvotes || 0 }}</span>
        </button>
        <button
          @click="store.downvoteArticle(article.id)"
          class="flex items-center text-gray-600 hover:text-purple-600"
        >
          <ArrowDownCircle class="h-6 w-6 mr-1" />
          <span>{{ article.downvotes || 0 }}</span>
        </button>
        <button class="flex items-center text-gray-600 hover:text-purple-600">
          <MessageCircle class="h-6 w-6 mr-1" />
          <span>{{ article.comments || 0 }}</span>
        </button>
        <button
          @click="store.toggleBookmark(article.id)"
          class="flex items-center text-gray-600 hover:text-purple-600"
        >
          <Bookmark class="h-6 w-6 mr-1" />
          <span>Bookmark</span>
        </button>
      </div>

      <!-- References Section -->
      <div v-if="article.citations?.length" class="mt-12">
        <h2 class="text-2xl font-bold mb-4">References</h2>
        <ul class="list-decimal pl-6 text-gray-700">
          <li
            v-for="(citation, index) in article.citations"
            :key="index"
            class="mb-2"
          >
            <span v-html="citation"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="p-8">
    <p>Article not found.</p>
  </div>
</template>

<style scoped>
.prose {
  line-height: 1.75;
  color: #333;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: "Courier New", Courier, monospace;
  overflow-x: auto;
}

.prose code {
  font-size: 0.9rem;
}

.prose img {
  max-width: 100%;
  height: auto;
}
</style>
