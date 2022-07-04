<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

import store from '@/store/index';

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

tabStore.setTabList([
  {
    name: 'home',
    path: '/home',
    title: '首页',
    close: false,
  },
  {
    name: 'test',
    path: '/test',
    title: '测试',
    close: true,
  },
]);
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
        <el-header bg="#fff">
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

          <div class="tabs-menu">
            <el-tabs
              v-model="tabStore.activeTabName"
              type="card"
              class="demo-tabs"
              @tab-click="tabClick"
              @tab-remove="removeTab"
              closable
            >
              <el-tab-pane
                v-for="item in tabStore.tabList"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                <template #label>
                  <!-- <el-icon class="tabs-icon" v-if="item.icon">
							<component :is="item.icon"></component>
						</el-icon> -->
                  {{ item.title }}
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-header>

        <!-- class="min-h-[calc(100vh-60px)]" -->
        <el-main bg="#edeff2">
          <router-view bg="#fff" w="100%" h="100%" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  --el-header-height: 90px;
}

:deep(.tabs-menu) {
  position: relative;
  width: 100%;
  .el-dropdown {
    position: absolute;
    top: 8px;
    right: 13px;
  }
  .tabs-icon {
    top: 2px;
  }
  .el-tabs__nav-wrap {
    position: absolute;
    width: calc(100% - 120px);
  }
  .el-tabs--card > .el-tabs__header {
    height: 40px;
    padding: 0 10px;
    margin: 0;
    box-sizing: border-box;
    border-bottom: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    color: #cccccc;
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
  .el-tabs__item .is-icon-close svg {
    margin-top: 0.5px;
  }
}
</style>
