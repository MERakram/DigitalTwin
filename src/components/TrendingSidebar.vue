<script setup lang="ts">
import { ref } from "vue";
import { Users, TrendingUp, BookOpen, Link } from "lucide-vue-next"; // Import icons

const trendingArticles = ref([
  {
    id: 1,
    title: "The Future of NLP in Business",
    author: "Dr. Sarah Chen",
    authorAvatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=SarahChen&size=48",
    reads: 1234,
    timeAgo: "2 days ago",
  },
  {
    id: 2,
    title: "Computer Vision Trends 2025",
    author: "Prof. James Wilson",
    authorAvatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=JamesWilson&size=48",
    reads: 987,
    timeAgo: "3 days ago",
  },
  {
    id: 3,
    title: "AI Ethics in Practice",
    author: "Dr. Emily Rodriguez",
    authorAvatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=EmilyRodriguez&size=48",
    reads: 756,
    timeAgo: "5 days ago",
  },
  {
    id: 4,
    title: "Machine Learning in Healthcare",
    author: "Dr. Michael Patel",
    authorAvatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=MichaelPatel&size=48",
    reads: 1500,
    timeAgo: "1 day ago",
  },
  {
    id: 5,
    title: "Robotics Automation Boom",
    author: "Eng. Laura Kim",
    authorAvatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=LauraKim&size=48",
    reads: 890,
    timeAgo: "4 days ago",
  },
]);

const researchersToFollow = ref([
  {
    id: 1,
    name: "Raphael Moutard",
    title: "VP Engineering - Former @Amazon",
    avatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=RaphaelMoutard&size=48",
  },
  {
    id: 2,
    name: "Writers and Editors of Color Magazine",
    title: "Publication",
    avatar:
      "https://api.dicebear.com/7.x/micah/svg?seed=WritersandEditors&size=48",
  },
  {
    id: 3,
    name: "Devon Price",
    title: "He/Him or It/Its. Social Psychologist & Author",
    avatar: "https://api.dicebear.com/7.x/micah/svg?seed=DevonPrice&size=48",
  },
  {
    id: 4,
    name: "Dr. Aisha Khan",
    title: "AI Ethics Researcher @Stanford",
    avatar: "https://api.dicebear.com/7.x/micah/svg?seed=AishaKhan&size=48",
  },
  {
    id: 5,
    name: "Liam Torres",
    title: "Cloud AI Specialist",
    avatar: "https://api.dicebear.com/7.x/micah/svg?seed=LiamTorres&size=48",
  },
]);

const externalLinks = ref([
  {
    title: "AI Research Papers",
    url: "https://arxiv.org/",
    icon: BookOpen, // Use Lucide icon component directly
  },
  {
    title: "Developer Resources",
    url: "https://developers.google.com/",
    icon: Link,
  },
  {
    title: "Machine Learning Tutorials",
    url: "https://www.coursera.org/",
    icon: BookOpen,
  },
  {
    title: "AI News Updates",
    url: "https://www.aiweekly.co/",
    icon: Link,
  },
]);
</script>

<template>
  <div class="w-80 bg-white rounded-lg shadow-sm p-6 sticky top-4">
    <!-- Trending Articles -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4 flex items-center">
        <TrendingUp class="mr-2 h-5 w-5 text-purple-600" />
        Trending This Week
      </h3>
      <div class="space-y-4">
        <div
          v-for="article in trendingArticles"
          :key="article.id"
          class="group cursor-pointer flex items-start"
        >
          <img
            :src="article.authorAvatar"
            :alt="article.author"
            class="w-10 h-10 rounded-full mr-3 flex-shrink-0"
          />
          <div>
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
    </div>

    <!-- Researchers to Follow -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4 flex items-center">
        <Users class="mr-2 h-5 w-5 text-purple-600" />
        Who to Follow
      </h3>
      <div class="space-y-4">
        <div
          v-for="researcher in researchersToFollow"
          :key="researcher.id"
          class="flex items-center justify-between"
        >
          <div class="flex items-center">
            <img
              :src="researcher.avatar"
              :alt="researcher.name"
              class="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h4 class="text-sm font-medium">{{ researcher.name }}</h4>
              <p class="text-xs text-gray-500">{{ researcher.title }}</p>
            </div>
          </div>
          <button
            class="px-3 py-1 rounded-full text-sm font-medium text-purple-600 border border-purple-600 hover:bg-purple-50 transition-colors"
          >
            Follow
          </button>
        </div>
      </div>
    </div>

    <!-- External Resources -->
    <div>
      <h3 class="text-lg font-semibold mb-4 flex items-center">
        <Link class="mr-2 h-5 w-5 text-purple-600" />
        External Resources
      </h3>
      <div class="space-y-3">
        <a
          v-for="link in externalLinks"
          :key="link.title"
          :href="link.url"
          class="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-900 transition-colors"
        >
          <component :is="link.icon" class="h-4 w-4" />
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here, if needed */
</style>
