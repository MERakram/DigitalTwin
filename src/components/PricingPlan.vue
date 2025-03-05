<template>
  <section
    class="py-20 px-6 bg-white flex items-center"
    style="min-height: calc(100vh - 4rem)"
  >
    <div class="max-w-[75vw] mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Subscription Plans</h2>
      <p class="text-lg text-gray-600 mb-8">
        Get AI implemented on your data by our expert team with ongoing support
        and consulting. Scientific papers sold separately.
      </p>

      <div class="mt-12 grid gap-6 md:grid-cols-4">
        <div
          v-for="plan in pricingPlans"
          :key="plan.title"
          class="p-8 rounded-lg border shadow-lg flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-2"
        >
          <!-- <div v-if="plan.popular" class="ribbon">Popular</div> -->
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
              class="flex items-center text-left"
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
            class="mt-6 w-full px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          >
            {{
              plan.title === "Enterprise"
                ? "Get a Quote"
                : plan.title === "Freemium"
                ? "Get Started"
                : "Subscribe Now"
            }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const pricingPlans = [
  {
    title: "Freemium",
    price: "€0",
    popular: false,
    features: [
      "Access to basic ready-to-use AI models",
      "Deploy on your own resources (AWS, Azure)",
      "Limited access to deployment platform (100MB text or 1GB images)",
      "No discount on acquisition rights",
    ],
  },
  {
    title: "Tier 1",
    price: "€99",
    popular: false,
    features: [
      "All Freemium features",
      "5% discount on acquisition rights",
      "Higher deployment quota",
      "Basic email support",
      "1-month onboarding",
      "2-3 user accounts",
      "Access to knowledge base",
    ],
  },
  {
    title: "Tier 2",
    price: "€299",
    popular: true,
    features: [
      "All Tier 1 features",
      "15% discount on acquisition rights",
      "Run up to 3 parallel AI models",
      "Priority access to top-performing models",
      "Advanced support",
    ],
  },
  {
    title: "Enterprise",
    price: "Custom",
    popular: false,
    features: [
      "Very high or unlimited quotas",
      "Custom SLA and dedicated support",
      "Custom integration (on-premise, hybrid)",
      "Exclusive access to premium models",
      "R&D partnerships",
      "Negotiated pricing based on project needs",
    ],
  },
];
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 5px 15px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
