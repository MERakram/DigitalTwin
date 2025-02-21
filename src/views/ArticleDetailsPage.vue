<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useMainStore } from "../stores/main";
import Logo from "../components/Logo.vue";

const props = defineProps<{ id: string }>(); // Define the id prop
const store = useMainStore();

// Use a computed property to get the article.  MUCH better!
const article = computed(() => {
  return store.articles.find((a) => a.id === parseInt(props.id, 10)); // Parse id to number
});
</script>

<template>
  <div v-if="article" class="p-8">
    <nav class="px-6 py-4 bg-white border-b">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
      </div>
    </nav>
    <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
    <p class="text-gray-600 mb-4">By {{ article.author }}</p>
    <img
      :src="article.imageUrl"
      :alt="article.title"
      class="w-full h-64 object-cover mb-4 rounded-lg"
    />
    <p>{{ article.preview }}</p>
    {/* Display full article content here */}
  </div>
  <div v-else class="p-8">
    <p>Article not found.</p>
  </div>
</template>
