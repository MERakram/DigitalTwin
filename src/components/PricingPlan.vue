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

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="plan in pricingPlans"
          :key="plan.title"
          class="p-8 rounded-lg border shadow-lg flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-2"
        >
          <h3 class="text-3xl font-semibold mb-2">{{ plan.title }}</h3>
          <p class="text-5xl font-bold mb-4">
            {{ plan.price
            }}<span class="text-base font-normal">
              {{ plan.title === "Entreprise" ? "" : "/ month" }}</span
            >
          </p>
          <p class="text-gray-600 mb-4">{{ plan.description }}</p>
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
            {{ plan.buttonText }}
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
    description: "Explore AI potential with your first models, no commitments.",
    buttonText: "Get Started Free",
    features: [
      "1 AI model with limited quotas (100MB text/1GB images)",
      "Deploy on your own resources (AWS, Azure)",
      "Access to 5000+ user community",
      "No discount on acquisition rights",
    ],
  },
  {
    title: "Premium",
    price: "€99",
    description:
      "Expanded resources with priority support for scaled deployment.",
    buttonText: "Subscribe Now",
    features: [
      "Multiple deployable AI models with higher quotas",
      "5-15% discount on acquisition rights",
      "Priority email/chat support",
      "Personalized onboarding & training",
      "Early access to latest updates",
      "Multi-user team accounts",
    ],
  },
  {
    title: "Entreprise",
    price: "Custom",
    description:
      "Industrialize your AI strategy with dedicated infrastructure.",
    buttonText: "Get a Quote",
    features: [
      "Unlimited model deployment & data quotas",
      "Custom integration (on-premise, hybrid cloud)",
      "24/7 dedicated support with enhanced SLA",
      "Exclusive access to premium AI models",
      "Team management tools & permissions",
      "Custom pricing based on project needs",
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
