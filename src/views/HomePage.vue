<script setup lang="ts">
import { useMainStore } from '../stores/main'
import Logo from '../components/Logo.vue'
import TrendingSidebar from '../components/TrendingSidebar.vue'

const store = useMainStore()
const categories = [
  'Natural Language Processing',
  'Computer Vision',
  'Machine Learning',
  'Data Analytics',
  'Robotics',
  'Cloud AI'
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="px-6 py-4 bg-white border-b">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <div class="flex gap-4">
          <router-link to="/upload" class="btn-secondary">Upload Article</router-link>
          <button class="btn-primary">Get Started</button>
        </div>
      </div>
    </nav>

    <div class="border-b bg-white">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex gap-6 overflow-x-auto pb-2">
          <button 
            v-for="category in categories" 
            :key="category"
            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                   hover:bg-purple-50 hover:text-purple-900 transition-colors
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex gap-8">
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-8">Latest AI Solutions</h1>
          
          <div class="grid gap-6">
            <div v-for="article in store.articles" :key="article.id" 
                class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div class="aspect-video bg-gradient-to-br from-purple-900 to-purple-700 relative">
                <div class="absolute inset-0 flex items-center justify-center text-white">
                  <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.96-.417-2.634-1.09l-.548.547z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <h2 class="text-xl font-semibold">{{ article.title }}</h2>
                  <span class="text-lg font-bold text-purple-900">${{ article.price }}</span>
                </div>
                <p class="text-gray-600 mb-4">{{ article.preview }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">By {{ article.author }}</span>
                  <button class="btn-secondary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <TrendingSidebar />
      </div>
    </main>
  </div>
</template>