<script lang="ts" setup>
import { initMenuList } from '@/services/request';
import { formatTree, generateRoute } from '@/libs/asyncRoutes';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

import store from '@/store/index';
import { ReactiveVariable } from 'vue/macros';
import { RouteLocationMatched } from 'vue-router';

const authStore = store().Auth;
const router = useRouter();
const route = useRoute();
console.log(route, '💙💛 route');

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, '💙💛 选中项');
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const changePages = (event: any) => {
  console.log(event, '💙💛');
};

const activeMenu = $computed((): string => route.path);
let breadcrumbList: RouteLocationMatched[] = $ref([]);

const caleBreadcrumb = () => {
  breadcrumbList = route.matched.filter((item) => item.meta && item.meta.title);
};

watch(
  route,
  () => {
    caleBreadcrumb();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="common-layout" min-h-screen>
    <el-container>
      <el-aside min-h-screen width="200px" bg="blue-300">
        <div
          w="100%"
          h="60px"
          bg="black"
          color="#fff"
          flex
          items-center
          justify-center
        >
          <img src="@/assets/logo.png" w="40px" h="40px" alt="" />
          Soumns-Admin
        </div>

        <el-menu
          class="el-menu-vertical-demo min-h-[calc(100vh-60px)]"
          @open="handleOpen"
          @close="handleClose"
          background-color="black"
          text-color="#fff"
          active-text-color="#ff6100"
          :style="{ borderRight: '0' }"
          router
          unique-opened
          :default-active="activeMenu"
        >
          <template
            v-for="(item, idx) in authStore.authRoutes"
            :key="item.path"
          >
            <el-sub-menu
              v-if="item.children && item.children.length > 0"
              :index="item.path"
            >
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="it1.path"
                v-for="(it1, idx1) in item.children"
                :key="idx1"
                @click="changePages"
              >
                <template #title>
                  <el-icon><location /></el-icon>
                </template>
                {{ it1.name }}</el-menu-item
              >
            </el-sub-menu>

            <el-menu-item v-else :index="item.path">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header h="60px" bg="#fff">Header</el-header>

        <el-breadcrumb
          separator="/"
          h="40px"
          bg="#efefef"
          flex
          items-center
          p="l20px"
          mode="out-in"
        >
          <el-breadcrumb-item :to="{ path: '/home' }" key="/home"
            >首页</el-breadcrumb-item
          >

          <el-breadcrumb-item
            v-for="item in breadcrumbList"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>

        <el-main class="min-h-[calc(100vh-60px)]" bg="#edeff2">
          <router-view bg="#fff" w="100%" h="100%" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
