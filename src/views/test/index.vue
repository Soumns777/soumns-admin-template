<script lang="ts" setup name="test">
import cacheRouter from '@/hooks/useCache';
</script>

<template>
  <div class="container">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform">
        <keep-alive :include="cacheRouter">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss"></style>
