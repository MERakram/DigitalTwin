<script setup lang="ts">
import { defineProps } from "vue";

// Default values using withDefaults
withDefaults(
  defineProps<{
    size?: number;
    primaryColor?: string;
    secondaryColor?: string;
    text?: string;
    textSize?: string;
  }>(),
  {
    size: 32,
    primaryColor: "fill-purple-600",
    secondaryColor: "fill-purple-400",
    text: "Digital Twin",
    textSize: "text-xl",
  }
);

defineOptions({
  name: "Logo",
});
</script>

<template>
  <div class="flex items-center gap-2">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" :class="primaryColor" />
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        rx="4"
        :class="secondaryColor"
        opacity="0.8"
      />
    </svg>
    <span class="font-semibold" :class="textSize">{{ text }}</span>
  </div>
</template>
