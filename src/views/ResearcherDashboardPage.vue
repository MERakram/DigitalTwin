<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Researcher Dashboard</h1>

    <div>
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold">My Articles</h2>
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded transition-colors"
          @click="openAddArticleModal"
        >
          + Add New Article
        </button>
      </div>

      <div
        v-if="articles.length === 0"
        class="text-center py-12 bg-gray-100 rounded-lg"
      >
        <p class="mb-4">You haven't uploaded any articles yet.</p>
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded transition-colors"
          @click="openAddArticleModal"
        >
          Upload Your First Article
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          <img
            :src="article.coverImage"
            class="w-full h-40 object-cover"
            alt="Article cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
            <p class="text-2xl font-bold text-green-600 my-2">
              {{ formatPrice(article.price) }}
            </p>
            <p class="flex justify-between text-gray-600 mb-4">
              <span>{{ article.purchases }} purchases</span>
              <span>{{ article.views }} views</span>
            </p>
            <div class="flex gap-2">
              <button
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded border border-gray-300 transition-colors"
                @click="editArticle(article.id)"
              >
                Edit
              </button>
              <button
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                @click="viewArticle(article.id)"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Article Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showAddModal = false"
    >
      <div
        class="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 class="text-2xl font-bold mb-6">Add New Article</h2>
        <form @submit.prevent="submitArticle">
          <div class="mb-6">
            <label for="title" class="block mb-2 font-bold">Title</label>
            <input
              type="text"
              id="title"
              v-model="newArticle.title"
              class="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div class="mb-6">
            <label for="abstract" class="block mb-2 font-bold">Abstract</label>
            <textarea
              id="abstract"
              v-model="newArticle.abstract"
              rows="3"
              class="w-full p-3 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          <div class="mb-6">
            <label for="price" class="block mb-2 font-bold">Price (€)</label>
            <input
              type="number"
              id="price"
              v-model.number="newArticle.price"
              min="1000"
              max="10000"
              step="1"
              class="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div class="mb-6">
            <label for="article-file" class="block mb-2 font-bold"
              >Upload Article (PDF)</label
            >
            <input
              type="file"
              id="article-file"
              @change="handleFileUpload"
              accept=".pdf"
              class="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div class="mb-6">
            <label for="cover-image" class="block mb-2 font-bold"
              >Cover Image</label
            >
            <input
              type="file"
              id="cover-image"
              @change="handleCoverImageUpload"
              accept="image/*"
              class="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div class="flex justify-end gap-4 mt-8">
            <button
              type="button"
              class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded border border-gray-300 transition-colors"
              @click="showAddModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors"
            >
              Submit Article
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface Article {
  id: number;
  title: string;
  coverImage: string;
  price: number;
  purchases: number;
  views: number;
}

interface NewArticle {
  title: string;
  abstract: string;
  price: number;
  file: File | null;
  coverImage: File | null;
}

const router = useRouter();
const showAddModal = ref<boolean>(false);
const articles = ref<Article[]>([]);
const newArticle = ref<NewArticle>({
  title: "",
  abstract: "",
  price: 1999,
  file: null,
  coverImage: null,
});

// Mock function to fetch researcher's articles
const fetchArticles = async (): Promise<void> => {
  // In a real app, this would be an API call
  articles.value = [
    {
      id: 1,
      title: "Advancements in Neural Networks for Image Recognition",
      coverImage: "https://via.placeholder.com/300x200",
      price: 2999,
      purchases: 12,
      views: 245,
    },
    {
      id: 2,
      title: "Transfer Learning in Natural Language Processing",
      coverImage: "https://via.placeholder.com/300x200",
      price: 3499,
      purchases: 8,
      views: 187,
    },
  ];
};

onMounted(() => {
  fetchArticles();
});

const openAddArticleModal = (): void => {
  showAddModal.value = true;
};

const handleFileUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    newArticle.value.file = target.files[0];
  }
};

const handleCoverImageUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    newArticle.value.coverImage = target.files[0];
  }
};

const submitArticle = async (): Promise<void> => {
  // In a real app, this would upload the article to the server
  console.log("Submitting article:", newArticle.value);

  // Mock adding the article to the list
  articles.value.push({
    id: Date.now(),
    title: newArticle.value.title,
    coverImage: "https://via.placeholder.com/300x200",
    price: newArticle.value.price,
    purchases: 0,
    views: 0,
  });

  // Reset form and close modal
  newArticle.value = {
    title: "",
    abstract: "",
    price: 1999,
    file: null,
    coverImage: null,
  };
  showAddModal.value = false;
};

const editArticle = (id: number): void => {
  console.log("Editing article with id:", id);
  // Implementation would go here
};

const viewArticle = (id: number): void => {
  router.push(`/articles/${id}`);
};

const formatPrice = (price: number): string => {
  return `€${price.toLocaleString()}`;
};
</script>
