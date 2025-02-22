<script setup lang="ts">
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";
import {
  Brain,
  Building2,
  Cpu,
  Sparkles,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const router = useRouter();

const features = [
  { title: "AI Solutions", icon: Brain },
  { title: "Automation", icon: Cpu },
  { title: "Integration", icon: Building2 },
  { title: "Innovation", icon: Sparkles },
];

const whyChooseFeatures = [
  {
    title: "Ready-to-Use Solutions",
    description:
      "Discover pre-built AI solutions that can be implemented immediately.",
    icon: Brain,
  },
  {
    title: "Expert Guidance",
    description:
      "Get support from AI experts who understand technology and business.",
    icon: Building2,
  },
  {
    title: "Affordable Pricing",
    description: "Pay only for what you need, with transparent pricing.",
    icon: Sparkles,
  },
  {
    title: "Dedicated Support",
    description: "Receive personalized support from our dedicated team.",
    icon: Users,
  },
  {
    title: "Scalable Solutions",
    description: "Solutions that grow with your business, no matter the size.",
    icon: CheckCircle,
  },
  {
    title: "Cost-Effective",
    description:
      "Maximize your ROI with our competitively priced AI solutions.",
    icon: DollarSign,
  },
];

const pricingPlans = [
  {
    title: "Basic",
    price: "$49",
    features: [
      "Access to 5 AI solutions",
      "Email support",
      "Basic reporting",
      "Community access",
      "Standard onboarding",
    ],
  },
  {
    title: "Pro",
    price: "$99",
    features: [
      "Access to 20 AI solutions",
      "Priority email support",
      "Advanced reporting",
      "Community access",
      "Premium onboarding",
      "Monthly strategy call",
    ],
  },
  {
    title: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited AI solutions",
      "Dedicated account manager",
      "Custom reporting & analytics",
      "24/7 support",
      "Personalized onboarding",
      "Quarterly business reviews",
    ],
  },
];

// Corrected image paths assuming assets are in public directory
const partners = [
  "/icons/coinbase.svg",
  "/icons/notion.svg",
  "/icons/linear.svg",
  "/icons/tinder.svg",
  "/icons/gumroad.svg",
  "/icons/tinder.svg",
];

const carousel = ref<HTMLElement | null>(null);
const scrollAmount = ref(0);
const scrollInterval = ref<number | null>(null);

onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  if (scrollInterval.value !== null) {
    clearInterval(scrollInterval.value);
    scrollInterval.value = null;
  }
});

const startCarousel = () => {
  if (scrollInterval.value === null) {
    scrollInterval.value = window.setInterval(() => {
      if (carousel.value) {
        scrollAmount.value += 1;
        carousel.value.scrollLeft = scrollAmount.value;

        if (
          scrollAmount.value >=
          carousel.value.scrollWidth - carousel.value.clientWidth
        ) {
          scrollAmount.value = 0;
          carousel.value.scrollLeft = 0;
        }
      }
    }, 20);
  }
};

const handleGetStarted = () => {
  router.push("/home");
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 to-purple-950"
  >
    <!-- Navbar (Transparent) -->
    <nav class="px-4 py-4">
      <div
        class="max-w-7xl text-white mx-auto flex justify-between items-center"
      >
        <Logo />
        <div class="flex gap-4">
          <button
            class="px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 border-2 border-white hover:bg-white/10"
          >
            Login
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content (Scrollable) -->
    <main class="flex-grow">
      <!-- Hero Section -->
      <section
        class="py-20 px-6 flex items-center"
        style="min-height: calc(100vh - 4rem)"
      >
        <div class="max-w-[90rem] mx-auto">
          <div class="grid md:grid-cols-2 gap-16">
            <div>
              <h1 class="text-6xl md:text-8xl font-bold mb-8 text-white">
                Democratizing AI for Small Businesses
              </h1>
              <p class="text-xl text-gray-200 mb-8">
                Digital Twin helps small companies harness the power of AI
                without the need for in-house expertise.
              </p>
              <div class="flex gap-4">
                <button
                  @click="handleGetStarted"
                  class="px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 border-2 border-white hover:bg-white/10 flex items-center"
                >
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 ml-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  v-for="feature in features"
                  :key="feature.title"
                  class="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-sm"
                >
                  <div class="flex items-center gap-4 mb-4">
                    <div
                      class="w-12 h-12 rounded-lg flex items-center justify-center"
                    >
                      <component
                        :is="feature.icon"
                        class="h-8 w-8 text-white"
                      />
                    </div>
                    <h3 class="text-xl font-semibold text-white">
                      {{ feature.title }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- "Why Choose" Section -->
      <section
        class="py-20 px-6 bg-gradient-to-br from-purple-900 to-purple-950 flex items-center"
        style="min-height: calc(100vh - 4rem)"
      >
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-16 text-white">
            Why Choose Digital Twin?
          </h2>
          <p class="text-lg text-gray-200">
            We make AI implementation simple, affordable, and effective for
            small businesses.
          </p>
          <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(feature, i) in whyChooseFeatures"
              :key="i"
              class="relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-500/20"
            >
              <component
                :is="feature.icon"
                class="h-8 w-8 text-purple-400 mb-4"
              />
              <h3 class="text-xl font-semibold text-white">
                {{ feature.title }}
              </h3>
              <p class="mt-4 mb-4 text-purple-200">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section
        class="py-20 px-6 bg-white flex items-center"
        style="min-height: calc(100vh - 4rem)"
      >
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Pricing Plans</h2>
          <p class="text-lg text-gray-600">
            Choose the plan that's right for your business.
          </p>

          <div class="mt-12 grid gap-8 md:grid-cols-3">
            <div
              v-for="plan in pricingPlans"
              :key="plan.title"
              class="p-8 rounded-lg border shadow-lg flex flex-col"
            >
              <h3 class="text-3xl font-semibold mb-2">{{ plan.title }}</h3>
              <p class="text-5xl font-bold mb-4">
                {{ plan.price
                }}<span class="text-base font-normal">
                  {{ plan.title === "Enterprise" ? "" : "/ month" }}</span
                >
              </p>
              <ul class="space-y-3 flex-grow">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 mr-2 text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              <button
                class="mt-6 w-full px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700"
              >
                {{
                  plan.title === "Enterprise" ? "Get a Quote" : "Get Started"
                }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Partners Section (Carousel) -->
      <section class="py-10 px-6 bg-gray-100">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-8">Trusted by Leading Companies</h2>
          <div
            ref="carousel"
            class="flex overflow-x-hidden whitespace-nowrap gap-8"
          >
            <img
              v-for="partner in partners"
              :key="partner"
              :src="partner"
              alt="Partner Logo"
              class="h-12 w-auto object-contain inline-block"
            />
            <!-- Duplicate for seamless loop -->
            <img
              v-for="partner in partners"
              :key="partner + 'dup'"
              :src="partner"
              alt="Partner Logo"
              class="h-12 w-auto object-contain inline-block"
            />
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo :text-color="'text-white'" />
            <p class="mt-4 text-gray-400">
              Empowering small businesses with AI.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Company</h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Resources</h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white"
                  >Help Center</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white"
                  >Terms of Service</a
                >
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white"
                  >Privacy Policy</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 text-center text-gray-400">
          © {{ new Date().getFullYear() }} Digital Twin. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
