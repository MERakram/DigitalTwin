<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";
import {
  Pencil,
  PlusCircle,
  Eye as EyeIcon,
  ExternalLink as ExternalLinkIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText,
  File as FileIcon,
  Image as ImageIcon,
  Eye,
  ShoppingCart,
  BarChart2 as BarChart2Icon,
  PenTool as PencilIcon,
} from "lucide-vue-next";

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

const showAddModal = ref<boolean>(false);
const articles = ref<Article[]>([]);
const coverImagePreview = ref<string | null>(null);
const coverImageInput = ref<HTMLInputElement | null>(null);
const articleFileInput = ref<HTMLInputElement | null>(null);

const newArticle = ref<NewArticle>({
  title: "",
  abstract: "",
  price: 3499,
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
      coverImage:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 2999,
      purchases: 12,
      views: 245,
    },
    {
      id: 2,
      title: "Transfer Learning in Natural Language Processing",
      coverImage:
        "https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 3499,
      purchases: 8,
      views: 187,
    },
    {
      id: 3,
      title: "Generative AI: Applications in Creative Industries",
      coverImage:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 4999,
      purchases: 27,
      views: 512,
    },
  ];
};

const getTotalPurchases = (): number => {
  return articles.value.reduce(
    (total, article) => total + article.purchases,
    0
  );
};

const getTotalViews = (): number => {
  return articles.value.reduce((total, article) => total + article.views, 0);
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
    const file = target.files[0];
    newArticle.value.coverImage = file;

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      if (e.target && typeof e.target.result === "string") {
        coverImagePreview.value = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
};

const submitArticle = async (): Promise<void> => {
  // In a real app, this would upload the article to the server
  console.log("Submitting article:", newArticle.value);

  // Mock adding the article to the list
  articles.value.push({
    id: Date.now(),
    title: newArticle.value.title,
    coverImage:
      coverImagePreview.value ||
      "https://images.unsplash.com/photo-1684158114390-0d819d18ff87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    price: newArticle.value.price,
    purchases: 0,
    views: 0,
  });

  // Reset form and close modal
  newArticle.value = {
    title: "",
    abstract: "",
    price: 3499,
    file: null,
    coverImage: null,
  };
  coverImagePreview.value = null;
  showAddModal.value = false;
};

const editArticle = (id: number): void => {
  console.log("Editing article with id:", id);
  // Implementation would go here
};

const viewArticle = (id: number): void => {
  // router.push(`/articles/${id}`);
  console.log("Viewing article with id:", id);
};

const formatPrice = (price: number): string => {
  return `€${price.toLocaleString()}`;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar with clickable logo -->
    <nav class="py-4 bg-white shadow-md">
      <div class="mx-auto max-w-[90rem] px-6 flex justify-between items-center">
        <router-link to="/home">
          <Logo class="cursor-pointer" />
        </router-link>
      </div>
    </nav>

    <main class="max-w-[90rem] mx-auto px-6 py-8">
      <!-- Dashboard Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Researcher Dashboard</h1>
          <p class="text-gray-600 mt-1">
            Manage your AI solutions and track your impact
          </p>
        </div>
        <button
          class="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          @click="openAddArticleModal"
        >
          <PlusCircle class="w-5 h-5" />
          New Article
        </button>
      </div>

      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-700 font-medium text-lg">Total Articles</h3>
            <FileText class="w-6 h-6 text-purple-600" />
          </div>
          <p class="text-4xl font-bold mt-3 text-gray-800">
            {{ articles.length }}
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-700 font-medium text-lg">Total Purchases</h3>
            <ShoppingCart class="w-6 h-6 text-purple-600" />
          </div>
          <p class="text-4xl font-bold mt-3 text-gray-800">
            {{ getTotalPurchases() }}
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-gray-700 font-medium text-lg">Total Views</h3>
            <Eye class="w-6 h-6 text-purple-600" />
          </div>
          <p class="text-4xl font-bold mt-3 text-gray-800">
            {{ getTotalViews() }}
          </p>
        </div>
      </div>

      <!-- Articles Section -->
      <div
        class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
      >
        <div class="border-b border-gray-100 p-6">
          <h2 class="text-2xl font-semibold text-gray-800">My Articles</h2>
        </div>

        <div v-if="articles.length === 0" class="text-center py-20 px-6">
          <div class="mb-4">
            <FileText class="w-16 h-16 text-gray-300 mx-auto" />
          </div>
          <p class="text-gray-500 text-lg mb-6">
            You haven't published any articles yet
          </p>
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm"
            @click="openAddArticleModal"
          >
            Publish Your First Article
          </button>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="article in articles"
            :key="article.id"
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <div
                class="md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  :src="article.coverImage"
                  class="w-full h-full object-cover"
                  alt="Article cover"
                />
              </div>
              <div class="flex-grow">
                <h3 class="text-xl font-semibold mb-2 text-gray-900">
                  {{ article.title }}
                </h3>
                <!-- Larger earnings display -->
                <div class="text-3xl font-bold text-purple-600 mb-3">
                  {{ formatPrice(article.price) }}
                </div>
                <div class="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <EyeIcon class="w-5 h-5 mr-2 text-gray-500" />
                    {{ article.views }} views
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <ShoppingCartIcon class="w-5 h-5 mr-2 text-gray-500" />
                    {{ article.purchases }} purchases
                  </div>
                </div>
                <div class="flex flex-wrap gap-3">
                  <button
                    class="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
                    @click="editArticle(article.id)"
                  >
                    <PencilIcon class="w-4 h-4 inline mr-2" /> Edit
                  </button>
                  <button
                    class="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
                    @click="viewArticle(article.id)"
                  >
                    <ExternalLinkIcon class="w-4 h-4 inline mr-2" /> View
                  </button>
                  <button
                    class="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
                  >
                    <BarChart2Icon class="w-4 h-4 inline mr-2" /> Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Article Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      @click.self="showAddModal = false"
    >
      <div
        class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div class="border-b border-gray-200 p-6">
          <h2 class="text-2xl font-bold text-gray-800">Publish New Article</h2>
        </div>

        <form @submit.prevent="submitArticle" class="p-6">
          <div class="mb-6">
            <label
              for="title"
              class="block mb-2 text-sm font-semibold text-gray-700"
              >Article Title</label
            >
            <input
              type="text"
              id="title"
              v-model="newArticle.title"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              placeholder="Enter a descriptive title"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="abstract"
              class="block mb-2 text-sm font-semibold text-gray-700"
              >Abstract</label
            >
            <textarea
              id="abstract"
              v-model="newArticle.abstract"
              rows="3"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              placeholder="Describe your article in a few sentences"
              required
            ></textarea>
          </div>

          <div class="mb-6">
            <label
              for="price"
              class="block mb-2 text-sm font-semibold text-gray-700"
              >Price (€)</label
            >
            <input
              type="number"
              id="price"
              v-model.number="newArticle.price"
              min="1000"
              max="10000"
              step="1"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              required
            />
            <p class="mt-1 text-xs text-gray-500">
              Set a price between €1,000 and €10,000
            </p>
          </div>

          <div class="mb-6">
            <label
              for="cover-image"
              class="block mb-2 text-sm font-semibold text-gray-700"
              >Cover Image</label
            >
            <div
              class="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50"
            >
              <input
                type="file"
                id="cover-image"
                @change="handleCoverImageUpload"
                accept="image/*"
                class="hidden"
                ref="coverImageInput"
              />
              <div v-if="coverImagePreview" class="mb-4">
                <img
                  :src="coverImagePreview"
                  alt="Cover preview"
                  class="h-48 mx-auto object-contain rounded-md shadow-sm"
                />
              </div>
              <button
                type="button"
                @click="$refs.coverImageInput.click()"
                class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
              >
                <ImageIcon class="w-5 h-5 inline mr-2 text-purple-600" />
                {{ coverImagePreview ? "Change Image" : "Upload Image" }}
              </button>
            </div>
          </div>

          <div class="mb-6">
            <label
              for="article-file"
              class="block mb-2 text-sm font-semibold text-gray-700"
              >Upload Article (PDF)</label
            >
            <div
              class="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50"
            >
              <input
                type="file"
                id="article-file"
                @change="handleFileUpload"
                accept=".pdf"
                class="hidden"
                ref="articleFileInput"
                required
              />
              <div
                v-if="newArticle.file"
                class="mb-4 p-3 bg-white rounded-md border border-gray-200 text-sm text-gray-700 shadow-sm"
              >
                <FileIcon class="w-5 h-5 inline mr-2 text-purple-600" />
                Selected file: {{ newArticle.file.name }}
              </div>
              <button
                type="button"
                @click="$refs.articleFileInput.click()"
                class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
              >
                <FileIcon class="w-5 h-5 inline mr-2 text-purple-600" />
                {{ newArticle.file ? "Change PDF" : "Upload PDF" }}
              </button>
            </div>
          </div>

          <div
            class="flex justify-end gap-4 mt-8 border-t border-gray-200 pt-6"
          >
            <button
              type="button"
              class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium shadow-sm"
              @click="showAddModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
