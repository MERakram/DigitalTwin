<template>
  <div class="researcher-dashboard">
    <h1 class="dashboard-title">Researcher Dashboard</h1>

    <div class="dashboard-content">
      <div class="dashboard-header">
        <h2>My Articles</h2>
        <button class="add-article-btn" @click="openAddArticleModal">
          + Add New Article
        </button>
      </div>

      <div v-if="articles.length === 0" class="no-articles">
        <p>You haven't uploaded any articles yet.</p>
        <button class="add-article-btn" @click="openAddArticleModal">
          Upload Your First Article
        </button>
      </div>

      <div v-else class="articles-grid">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <img
            :src="article.coverImage"
            class="article-image"
            alt="Article cover"
          />
          <div class="article-info">
            <h3>{{ article.title }}</h3>
            <p class="article-price">{{ formatPrice(article.price) }}</p>
            <p class="article-stats">
              <span>{{ article.purchases }} purchases</span>
              <span>{{ article.views }} views</span>
            </p>
            <div class="article-actions">
              <button class="edit-btn" @click="editArticle(article.id)">
                Edit
              </button>
              <button class="view-btn" @click="viewArticle(article.id)">
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
      class="modal-overlay"
      @click.self="showAddModal = false"
    >
      <div class="modal-content">
        <h2>Add New Article</h2>
        <form @submit.prevent="submitArticle">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="newArticle.title" required />
          </div>

          <div class="form-group">
            <label for="abstract">Abstract</label>
            <textarea
              id="abstract"
              v-model="newArticle.abstract"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="price">Price (€)</label>
            <input
              type="number"
              id="price"
              v-model="newArticle.price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div class="form-group">
            <label for="article-file">Upload Article (PDF)</label>
            <input
              type="file"
              id="article-file"
              @change="handleFileUpload"
              accept=".pdf"
              required
            />
          </div>

          <div class="form-group">
            <label for="cover-image">Cover Image</label>
            <input
              type="file"
              id="cover-image"
              @change="handleCoverImageUpload"
              accept="image/*"
            />
          </div>

          <div class="form-actions">
            <button
              type="button"
              class="cancel-btn"
              @click="showAddModal = false"
            >
              Cancel
            </button>
            <button type="submit" class="submit-btn">Submit Article</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showAddModal = ref(false);
const articles = ref([]);
const newArticle = ref({
  title: "",
  abstract: "",
  price: 0,
  file: null,
  coverImage: null,
});

// Mock function to fetch researcher's articles
const fetchArticles = async () => {
  // In a real app, this would be an API call
  articles.value = [
    {
      id: 1,
      title: "Advancements in Neural Networks for Image Recognition",
      coverImage: "https://via.placeholder.com/300x200",
      price: 29.99,
      purchases: 12,
      views: 245,
    },
    {
      id: 2,
      title: "Transfer Learning in Natural Language Processing",
      coverImage: "https://via.placeholder.com/300x200",
      price: 34.99,
      purchases: 8,
      views: 187,
    },
  ];
};

onMounted(() => {
  fetchArticles();
});

const openAddArticleModal = () => {
  showAddModal.value = true;
};

const handleFileUpload = (event) => {
  newArticle.value.file = event.target.files[0];
};

const handleCoverImageUpload = (event) => {
  newArticle.value.coverImage = event.target.files[0];
};

const submitArticle = async () => {
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
    price: 0,
    file: null,
    coverImage: null,
  };
  showAddModal.value = false;
};

const editArticle = (id) => {
  console.log("Editing article with id:", id);
  // Implementation would go here
};

const viewArticle = (id) => {
  router.push(`/articles/${id}`);
};

const formatPrice = (price) => {
  return `€${price.toFixed(2)}`;
};
</script>

<style scoped>
.researcher-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.dashboard-title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.add-article-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-article-btn:hover {
  background-color: #3d9c40;
}

.no-articles {
  text-align: center;
  padding: 3rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.article-info {
  padding: 1.5rem;
}

.article-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #4caf50;
}

.article-stats {
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-bottom: 1rem;
}

.article-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.view-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
}

.edit-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.view-btn {
  background-color: #2196f3;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #e0e0e0;
}

.view-btn:hover {
  background-color: #0d8bf2;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn:hover {
  background-color: #3d9c40;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
