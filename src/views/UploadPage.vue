<script setup lang="ts">
import { ref } from "vue";
import Logo from "../components/Logo.vue";

const title = ref("");
const category = ref("");
const price = ref("");
const description = ref("");
const content = ref("");

const categories = [
  "Natural Language Processing",
  "Computer Vision",
  "Machine Learning",
  "Data Analytics",
  "Robotics",
  "Cloud AI",
];

const handleSubmit = () => {
  // Handle form submission
  console.log({
    title: title.value,
    category: category.value,
    price: price.value,
    description: description.value,
    content: content.value,
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="px-6 py-4 bg-white border-b">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <div class="flex gap-4">
          <button class="btn-secondary">Sign In</button>
          <button class="btn-primary">Get Started</button>
        </div>
      </div>
    </nav>

    <main class="max-w-3xl mx-auto px-6 py-12">
      <div class="bg-white rounded-xl shadow-sm p-8">
        <h1 class="text-2xl font-bold mb-8">Share Your AI Solution</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Title</label
            >
            <input
              type="text"
              id="title"
              v-model="title"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter the title of your solution"
            />
          </div>

          <div>
            <label
              for="category"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Category</label
            >
            <select
              id="category"
              v-model="category"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div>
            <label
              for="price"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Price (USD)</label
            >
            <input
              type="number"
              id="price"
              v-model="price"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter the price"
            />
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Short Description</label
            >
            <textarea
              id="description"
              v-model="description"
              rows="3"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Write a brief description of your solution"
            ></textarea>
          </div>

          <div>
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Content</label
            >
            <textarea
              id="content"
              v-model="content"
              rows="10"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Write your article content here..."
            ></textarea>
          </div>

          <div class="flex items-center justify-between pt-4">
            <button type="button" class="btn-secondary">Save as Draft</button>
            <button type="submit" class="btn-primary">Publish Article</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
