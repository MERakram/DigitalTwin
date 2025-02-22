<script setup lang="ts">
import { useMainStore } from "./stores/main";
import { onMounted } from "vue";

const store = useMainStore();

onMounted(async () => {
  await store.fetchArticles();
});
</script>

<template>
  <router-view></router-view>
</template>
