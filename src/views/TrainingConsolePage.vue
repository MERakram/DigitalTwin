<script setup lang="ts">
import { ref, computed } from "vue";
import { useMainStore } from "../stores/main";
import { useRoute } from "vue-router";
import Logo from "../components/Logo.vue";
import { Upload, Settings, HelpCircle, Play, X, Save } from "lucide-vue-next";

const store = useMainStore();
const route = useRoute();

const modelId = computed(() => parseInt(route.params.modelId as string, 10));
const model = computed(() =>
  store.articles.find((article) => article.id === modelId.value)
);

const datasetFile = ref<File | null>(null);
const trainingParameters = ref({
  epochs: 10,
  batchSize: 32,
  learningRate: 0.001,
  validationSplit: 0.2,
});
const isTraining = ref(false);
const progress = ref(0);
const showSupport = ref(false);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    datasetFile.value = target.files[0];
  }
};

const startTraining = () => {
  if (!datasetFile.value) {
    alert("Please upload a dataset first");
    return;
  }

  isTraining.value = true;
  progress.value = 0;

  // Simulate training progress
  const interval = setInterval(() => {
    progress.value += Math.random() * 10;
    if (progress.value >= 100) {
      progress.value = 100;
      isTraining.value = false;
      clearInterval(interval);
      alert("Training completed successfully!");
    }
  }, 1000);
};

const openSupportDialog = () => {
  showSupport.value = true;
};

const closeSupportDialog = () => {
  showSupport.value = false;
};

const requestSupport = () => {
  alert("A support team member will contact you shortly!");
  showSupport.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navigation Bar -->
    <nav class="py-4 bg-white border-b">
      <div class="max-w-[90rem] mx-auto flex justify-between items-center px-6">
        <router-link :to="{ name: 'home' }">
          <Logo />
        </router-link>

        <div class="flex items-center gap-4">
          <button
            @click="openSupportDialog"
            class="text-gray-700 hover:text-purple-600 flex items-center gap-1"
          >
            <HelpCircle class="w-5 h-5" />
            <span>Support</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar - Configuration Panel -->
      <div class="w-80 bg-white border-r p-6 overflow-y-auto">
        <h2 class="text-xl font-bold mb-6">
          {{ model?.title || "Model" }} Training
        </h2>

        <!-- Dataset Upload -->
        <div class="mb-6">
          <h3 class="font-medium mb-2 text-gray-700">Upload Dataset</h3>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors"
          >
            <input
              type="file"
              id="datasetFile"
              @change="handleFileChange"
              class="hidden"
              accept=".csv,.xlsx,.json,.parquet"
            />
            <label
              for="datasetFile"
              class="cursor-pointer flex flex-col items-center"
            >
              <Upload class="w-8 h-8 text-gray-500 mb-2" />
              <span class="text-sm text-gray-600">
                {{ datasetFile ? datasetFile.name : "Click to upload dataset" }}
              </span>
            </label>
          </div>
        </div>

        <!-- Training Parameters -->
        <div class="mb-6">
          <h3 class="font-medium mb-2 flex items-center text-gray-700">
            <Settings class="w-4 h-4 mr-1" />
            Training Parameters
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Epochs</label>
              <input
                v-model.number="trainingParameters.epochs"
                type="number"
                min="1"
                max="100"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-1">Batch Size</label>
              <input
                v-model.number="trainingParameters.batchSize"
                type="number"
                min="1"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-1"
                >Learning Rate</label
              >
              <input
                v-model.number="trainingParameters.learningRate"
                type="number"
                step="0.001"
                min="0.0001"
                max="1"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-1"
                >Validation Split</label
              >
              <input
                v-model.number="trainingParameters.validationSplit"
                type="number"
                step="0.05"
                min="0.05"
                max="0.5"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <!-- Start Training Button -->
        <button
          @click="startTraining"
          :disabled="isTraining || !datasetFile"
          class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <Play v-if="!isTraining" class="w-5 h-5" />
          <svg
            v-else
            class="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ isTraining ? "Training..." : "Start Training" }}</span>
        </button>
      </div>

      <!-- Main Console Area -->
      <div class="flex-1 p-6 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold mb-4">Training Console</h2>

          <!-- Progress Bar -->
          <div v-if="isTraining || progress > 0" class="mb-6">
            <div class="flex justify-between mb-1 items-center">
              <span class="text-sm font-medium text-gray-700">Progress</span>
              <span class="text-sm font-medium text-gray-700"
                >{{ Math.round(progress) }}%</span
              >
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-purple-600 h-2.5 rounded-full"
                :style="`width: ${progress}%`"
              ></div>
            </div>
          </div>

          <!-- Training Log Output -->
          <div
            class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-[70vh] overflow-y-auto"
          >
            <p v-if="!isTraining && progress === 0">
              Training output will appear here...
            </p>
            <template v-else>
              <p>
                [{{ new Date().toLocaleTimeString() }}] Initializing training
                environment...
              </p>
              <p v-if="progress >= 10">
                [{{ new Date().toLocaleTimeString() }}] Loading dataset:
                {{ datasetFile?.name }}
              </p>
              <p v-if="progress >= 20">
                [{{ new Date().toLocaleTimeString() }}] Dataset loaded. Records:
                10,452
              </p>
              <p v-if="progress >= 25">
                [{{ new Date().toLocaleTimeString() }}] Preprocessing data...
              </p>
              <p v-if="progress >= 35">
                [{{ new Date().toLocaleTimeString() }}] Building model
                architecture...
              </p>
              <p v-if="progress >= 40">
                [{{ new Date().toLocaleTimeString() }}] Training started with
                parameters:
              </p>
              <p v-if="progress >= 40">
                &nbsp;&nbsp;- Epochs: {{ trainingParameters.epochs }}
              </p>
              <p v-if="progress >= 40">
                &nbsp;&nbsp;- Batch size: {{ trainingParameters.batchSize }}
              </p>
              <p v-if="progress >= 40">
                &nbsp;&nbsp;- Learning rate:
                {{ trainingParameters.learningRate }}
              </p>
              <p v-if="progress >= 45">
                [{{ new Date().toLocaleTimeString() }}] Epoch 1/{{
                  trainingParameters.epochs
                }}...
              </p>
              <p v-if="progress >= 55">
                [{{ new Date().toLocaleTimeString() }}] Epoch 2/{{
                  trainingParameters.epochs
                }}...
              </p>
              <p v-if="progress >= 65">
                [{{ new Date().toLocaleTimeString() }}] Epoch 3/{{
                  trainingParameters.epochs
                }}...
              </p>
              <p v-if="progress >= 75">
                [{{ new Date().toLocaleTimeString() }}] Validation accuracy:
                87.5%
              </p>
              <p v-if="progress >= 90">
                [{{ new Date().toLocaleTimeString() }}] Training complete
              </p>
              <p v-if="progress >= 100">
                [{{ new Date().toLocaleTimeString() }}] Model saved successfully
              </p>
            </template>
          </div>

          <!-- Save Model Button (visible after training) -->
          <div v-if="progress >= 100" class="mt-4 flex justify-end">
            <button
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <Save class="w-5 h-5" />
              Save Model
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Support Dialog -->
    <div
      v-if="showSupport"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Request Support</h3>
          <button
            @click="closeSupportDialog"
            class="text-gray-500 hover:text-gray-700"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="mb-4">
          <p class="text-gray-600">
            Need help with setting up your model training? Our AI specialists
            can help you optimize your parameters and dataset for the best
            results.
          </p>
        </div>

        <div class="flex justify-end gap-2">
          <button
            @click="closeSupportDialog"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="requestSupport"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Request Counseling Session
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
