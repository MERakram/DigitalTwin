<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleUserTypeSelection = (userType: "enterprise" | "researcher") => {
  //  For MVP, just route based on selection.  Later, you'd store this.
  if (userType === "enterprise") {
    router.push({ name: "home" }); // Or a dedicated enterprise dashboard
  } else {
    router.push({ name: "researcher-dashboard" }); // Or a dedicated researcher dashboard/upload page
  }
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-purple-500/35 to-blue-500/35 text-gray-800"
  >
    <!-- Simple background pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

    <div class="flex-grow flex flex-col items-center justify-center px-4 py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-center mb-6 text-blue-600">
        Select Your Experience
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl text-center mb-12">
        Choose how you want to interact with our digital twin platform based on
        your primary needs
      </p>

      <div class="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        <!-- Enterprise Card -->
        <button
          type="button"
          @click="handleUserTypeSelection('enterprise')"
          class="card-choice enterprise-card cursor-pointer p-10 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full md:w-1/2 h-[500px] flex flex-col items-center justify-center text-center border border-blue-200 bg-gradient-to-b from-blue-50 to-white"
        >
          <div class="mb-8 p-5 bg-blue-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-20 w-20 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-blue-700 mb-4">Enterprise</h2>
          <p class="text-gray-600 mb-8 text-lg">
            Access industrial digital twin solutions and analytics for your
            organization. Monitor performance, optimize operations and make
            data-driven decisions.
          </p>
          <div class="mt-6 text-blue-600 font-medium flex items-center group">
            <span class="text-lg">Get Started</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </button>

        <!-- Researcher Card -->
        <button
          type="button"
          @click="handleUserTypeSelection('researcher')"
          class="card-choice researcher-card cursor-pointer p-10 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full md:w-1/2 h-[500px] flex flex-col items-center justify-center text-center border border-purple-200 bg-gradient-to-b from-purple-50 to-white"
        >
          <div class="mb-8 p-5 bg-purple-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-20 w-20 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-purple-700 mb-4">Researcher</h2>
          <p class="text-gray-600 mb-8 text-lg">
            Upload, analyze, and collaborate on scientific data and digital
            twins. Simulate experiments, validate models and share findings with
            the community.
          </p>
          <div class="mt-6 text-purple-600 font-medium flex items-center group">
            <span class="text-lg">Get Started</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.card-choice {
  position: relative;
  overflow: hidden;
}

.card-choice:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-choice:hover:before {
  opacity: 0.02;
}

.enterprise-card:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.researcher-card:focus {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
