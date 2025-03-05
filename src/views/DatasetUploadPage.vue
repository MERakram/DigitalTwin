<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";

const datasetFile = ref<File | null>(null);
const datasetName = ref("");
const datasetDescription = ref("");
const router = useRouter();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    datasetFile.value = target.files[0];
  }
};

const handleUpload = () => {
  if (!datasetFile.value || !datasetName.value) {
    alert("Please select a file and provide a name.");
    return;
  }

  // Simulate upload (in a real app, you'd send this to a backend)
  console.log(
    "Uploading dataset:",
    datasetFile.value,
    datasetName.value,
    datasetDescription.value
  );
  alert(`Dataset "${datasetName.value}" upload simulated successfully!`);
  //  Redirect after "upload"
  router.push({ name: "home" });
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
        <h1 class="text-3xl font-bold mb-6">Upload Dataset</h1>

        <form @submit.prevent="handleUpload" class="space-y-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              v-model="datasetName"
              type="text"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Dataset Name</label
            >
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <textarea
              v-model="datasetDescription"
              class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              rows="3"
            />
            <label
              class="peer-focus:font-semibold absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Dataset Description (Optional)</label
            >
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Select Dataset File
            </label>
            <input
              type="file"
              @change="handleFileChange"
              class="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            class="w-full px-6 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Upload Dataset
          </button>
        </form>
      </div>
    </main>
  </div>
</template>
