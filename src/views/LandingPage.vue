<script setup lang="ts">
import Logo from "../components/Logo.vue";

const features = [
  {
    title: "AI Solutions",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.96-.417-2.634-1.09l-.548.547z",
    description:
      "Access pre-vetted, production-ready AI solutions specifically designed for small businesses.",
  },
  {
    title: "Expert Support",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    description:
      "Connect directly with researchers and get professional guidance for implementation.",
  },
  {
    title: "Cost-Effective",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    description:
      "Find solutions that fit your budget with transparent pricing and no hidden fees.",
  },
];
</script>

<template>
  <div class="min-h-screen">
    <div class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-purple-700/5"
      >
        <div
          class="absolute inset-0"
          style="
            background-image: url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234a148c\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E');
          "
        ></div>
      </div>

      <nav class="relative px-6 py-4 border-b bg-white/80 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div class="flex gap-4">
            <router-link to="/home" class="btn-secondary"
              >Browse Solutions</router-link
            >
            <button class="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      <main class="relative">
        <section class="py-20 px-6">
          <div class="max-w-7xl mx-auto">
            <div class="max-w-2xl">
              <h1
                class="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent"
              >
                Empowering Small Businesses with AI Solutions
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                Connect with top researchers and access cutting-edge AI
                technologies tailored for your business needs. No technical
                expertise required.
              </p>
              <div class="flex gap-4">
                <router-link to="/home" class="btn-primary"
                  >Browse Solutions</router-link
                >
                <button class="btn-secondary">Learn More</button>
              </div>
            </div>
          </div>
        </section>

        <section class="py-20 px-6 bg-white">
          <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold mb-12 text-center">
              Why Choose Digital Twin?
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
              <div
                v-for="feature in features"
                :key="feature.title"
                class="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-sm"
              >
                <div
                  class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      :d="feature.icon"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-4">{{ feature.title }}</h3>
                <p class="text-gray-600">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
