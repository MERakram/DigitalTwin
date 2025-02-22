<script setup lang="ts">
import { ref } from "vue";

const trendingArticles = ref([
  {
    id: 1,
    title: "The Future of NLP in Business",
    author: "Dr. Sarah Chen",
    reads: 1234,
    timeAgo: "2 days ago",
  },
  {
    id: 2,
    title: "Computer Vision Trends 2025",
    author: "Prof. James Wilson",
    reads: 987,
    timeAgo: "3 days ago",
  },
  {
    id: 3,
    title: "AI Ethics in Practice",
    author: "Dr. Emily Rodriguez",
    reads: 756,
    timeAgo: "5 days ago",
  },
]);

const bookmarks = ref([
  {
    id: 1,
    title: "Getting Started with AI Integration",
    category: "Tutorials",
  },
  {
    id: 2,
    title: "Best Practices for ML Models",
    category: "Best Practices",
  },
]);

const externalLinks = ref([
  {
    title: "AI Research Papers",
    url: "#",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    title: "Developer Resources",
    url: "#",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  },
]);
</script>

<template>
  <div class="w-80 bg-white rounded-lg shadow-sm p-6 sticky top-24">
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Trending This Week</h3>
      <div class="space-y-4">
        <div
          v-for="article in trendingArticles"
          :key="article.id"
          class="group cursor-pointer"
        >
          <h4
            class="text-sm font-medium group-hover:text-purple-900 transition-colors"
          >
            {{ article.title }}
          </h4>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span>{{ article.author }}</span>
            <span>•</span>
            <span>{{ article.reads }} reads</span>
            <span>•</span>
            <span>{{ article.timeAgo }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Your Bookmarks</h3>
      <div class="space-y-3">
        <div
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          class="group cursor-pointer"
        >
          <h4
            class="text-sm font-medium group-hover:text-purple-900 transition-colors"
          >
            {{ bookmark.title }}
          </h4>
          <span class="text-xs text-gray-500">{{ bookmark.category }}</span>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">External Resources</h3>
      <div class="space-y-3">
        <a
          v-for="link in externalLinks"
          :key="link.title"
          :href="link.url"
          class="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              :d="link.icon"
            />
          </svg>
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>
