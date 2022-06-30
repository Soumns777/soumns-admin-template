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
import { useRouter } from 'vue-router';
const authStore = store().Auth;
const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, '💙💛 选中项');
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const changePages = (event: any) => {
  console.log(event, '💙💛');
};
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
          v-for="(item, idx) in authStore.authRoutes"
          :key="idx"
          router
          unique-opened
        >
          <el-sub-menu :index="item.path">
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
        </el-menu>
      </el-aside>
      <el-container>
        <el-header h="60px" bg="#fff">Header</el-header>
        <el-main
          class="min-h-[calc(100vh-60px)]"
          bg="#efefef
"
        >
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
