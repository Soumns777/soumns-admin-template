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
import { TabsPaneContext } from 'element-plus/lib/tokens/tabs';

const authStore = store().Auth;
const tabStore = store().Tabs;
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

const tabClick = (tabItem: TabsPaneContext) => {
  console.log(tabItem, '💙💛 tabs items');
};

const removeTab = (activeTabPath: any) => {
  console.log(activeTabPath, '💙💛  activeTabPath');
};
</script>

<template>
  <div class="common-layout" min-h-screen>
    <el-container>
      <el-aside min-h-screen width="200px" bg="blue-300">
        <div
          w="100%"
          h="80px"
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
        <el-header h="60px" bg="#fff">
          <el-breadcrumb
            separator="/"
            flex
            items-center
            p="l20px"
            mode="out-in"
            h="40px"
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

          <el-tabs
            v-model="tabStore.activeTab"
            type="card"
            class="demo-tabs"
            @tab-click="tabClick"
            @tab-remove="removeTab"
            closable
          >
            <el-tab-pane
              v-for="item in tabStore.tabList"
              :key="item.name"
              :label="item.name"
              :name="item.name"
              :title="item.title"
            >
              {{ item.title }}
            </el-tab-pane>
          </el-tabs>
        </el-header>

        <!-- class="min-h-[calc(100vh-60px)]" -->
        <el-main bg="#edeff2">
          <router-view bg="#fff" w="100%" h="100%" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
