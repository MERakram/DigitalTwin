<script setup lang="ts">
import { computed, ref } from "vue";
import Logo from "../components/Logo.vue";
import { useMainStore } from "../stores/main";
import { useRouter } from "vue-router";

const title = ref("");
const author = ref(""); // Add author field
const category = ref("");
const price = ref("");
const preview = ref(""); // Changed from description
const content = ref("");
const imageUrl = ref(""); //added for the image link
const isOnSale = ref(false); //added for sale
const originalPrice = ref<number | null>(null);

const categories = [
  "Natural Language Processing",
  "Computer Vision",
  "Machine Learning",
  "Data Analytics",
  "Robotics",
  "Cloud AI",
  "Graph Neural Networks", // Added from the article examples
  "Recommender Systems", // Added from the article examples
];

const store = useMainStore();
const router = useRouter();

const nextId = computed(() => {
  // Find the maximum existing ID and add 1
  if (store.articles.length === 0) return 1;
  const maxId = store.articles.reduce(
    (max, article) => Math.max(max, article.id),
    0
  );
  return maxId + 1;
});

const handleSubmit = () => {
  if (
    !title.value ||
    !author.value ||
    !category.value ||
    !price.value ||
    !preview.value ||
    !content.value ||
    !imageUrl.value
  ) {
    alert("Please fill in all required fields.");
    return;
  }
  // Validate price (must be a number)
  const priceNum = parseFloat(price.value);
  if (isNaN(priceNum)) {
    alert("Price must be a valid number.");
    return;
  }
  const originalPriceNum = originalPrice.value
    ? parseFloat(originalPrice.value.toString())
    : null;
  if (
    isOnSale.value &&
    (originalPriceNum === null || isNaN(originalPriceNum))
  ) {
    alert("Original price must be a valid number when on sale.");
    return;
  }
  if (isOnSale.value && originalPriceNum! <= priceNum) {
    alert("Original price should be higher than the sale price");
    return;
  }

  const newArticle = {
    id: nextId.value, // Generate a unique ID
    title: title.value,
    author: author.value,
    authorAvatar: "/default-avatar.png", // You can add a default or let users upload
    releaseDate: new Date().toISOString().split("T")[0], // Today's date
    category: category.value,
    preview: preview.value,
    content: content.value,
    price: priceNum,
    originalPrice: originalPriceNum,
    isOnSale: isOnSale.value,
    upvotes: 0, // Start with 0
    downvotes: 0,
    comments: 0,
    imageUrl: imageUrl.value,
  };

  store.articles.push(newArticle); // Add to the store
  router.push("/home"); // Redirect to homepage
};
const handleOriginalPriceChange = () => {
  if (!isOnSale.value) {
    originalPrice.value = null; // Reset if not on sale
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="py-4">
      <div class="max-w-[90rem] mx-auto flex justify-between items-center">
        <router-link :to="{ name: 'home' }">
          <Logo />
        </router-link>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-12">
      <div class="bg-white rounded-xl shadow-sm p-8">
        <h1
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
        >
          Share Your AI Solution
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-6 pt-10">
          <div class="relative z-0 mb-6 w-full group">
            <input
              v-model="title"
              type="text"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Title</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              v-model="author"
              type="text"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Author</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <select
              v-model="category"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Category</label
            >
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="price"
                type="number"
                class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
                required
              />
              <label
                class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Price (USD)</label
              >
            </div>
            <!--Is on Sale-->
            <div class="relative z-0 mb-6 w-full group flex items-center">
              <input
                id="isOnSale"
                v-model="isOnSale"
                type="checkbox"
                @change="handleOriginalPriceChange"
                class="mr-2 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <label for="isOnSale" class="text-lg text-gray-500"
                >Is on Sale?</label
              >
            </div>
          </div>
          <!-- Original Price (Conditional) -->
          <div v-if="isOnSale" class="relative z-0 mb-6 w-full group">
            <input
              v-model="originalPrice"
              type="number"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              :required="isOnSale"
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Original Price (USD)</label
            >
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              v-model="imageUrl"
              type="text"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Image URL</label
            >
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <textarea
              v-model="preview"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              rows="3"
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Short Description (Preview)</label
            >
          </div>

          <div class="relative mb-6 w-full group">
            <h2 class="text-gray-500 font-semibold text-lg mb-2">Content</h2>
            <QuillEditor
              v-model:content="content"
              contentType="html"
              theme="snow"
              placeholder="Write your article content here..."
              toolbar="full"
            />
          </div>

          <div class="flex items-center justify-end pt-4">
            <button type="submit" class="btn-primary">Submit for Review</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
