<script lang="ts" setup>
import store from '@/store/index';
import { ArrowRight } from '@element-plus/icons-vue';
import { InjectionKey } from 'vue';
import {
  RouteLocationMatched,
  RouteLocationRaw,
  RouteRecordName,
} from 'vue-router';
import { TabsPaneContext } from 'element-plus/lib/tokens/tabs';
import { BgColorKey } from '@/types/dataScreen';

const authStore = store().Auth;
const tabStore = store().Tabs;
const router = useRouter();
const route = useRoute();

const activeMenu = $computed((): string => route.path);
const breadcrumbList: RouteLocationMatched[] = $computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title);
});

const activeTabPath = $computed(() => tabStore.activeTabPath);
const tabClick = (tabItem: TabsPaneContext) => {
  router.push(tabItem.props.name as RouteLocationRaw);
};

watch(
  () => route.path,
  () => {
    const tab: Tabs.ITab = {
      name: route.name as string,
      path: route.path,
      title: route.meta.title as string,
      close: true,
      icon: route.meta.icon as string,
    };

    tabStore.addTabs(tab);
  },
  {
    immediate: true,
  }
);

const removeTab = (activeTabPath: any) => {
  tabStore.removeTabs(activeTabPath);
};

// 测试provide、inject
const colorRef = ref('#ff6100');

const setColor = (color: string): void => {
  colorRef.value = color;
};

provide(BgColorKey, {
  color: colorRef,
  setColor,
});
</script>

<template>
  <div min-h-screen>
    <el-container>
      <el-aside width="200px" h="100%">
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

        <!-- min-h-[calc(100vh-80px)] -->
        <div class="menu">
          <el-menu
            class="el-menu-vertical-demo min-h-[calc(100vh-80px)]"
            background-color="black"
            text-color="#fff"
            active-text-color="#87CEFA"
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
                  <el-icon>
                    <component :is="item.meta.icon"></component>
                  </el-icon>

                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item
                  :index="it1.path"
                  v-for="(it1, idx1) in item.children"
                  :key="idx1"
                >
                  <template #title>
                    <el-icon>
                      <component :is="it1.meta.icon"></component>
                    </el-icon>
                    {{ it1.meta.title }}
                  </template>
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item v-else :index="item.path">
                <template #title>
                  <el-icon>
                    <component :is="item.meta.icon"></component>
                  </el-icon>
                  <span>{{ item.meta.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header bg="#fff">
          <el-breadcrumb
            :separator-icon="ArrowRight"
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
              v-for="item in breadcrumbList.filter(
                (item) => item.meta.title !== '首页'
              )"
              :key="item.path"
              :to="{ path: item.path }"
              >{{ item.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>

          <div class="tabs-menu">
            <el-tabs
              v-model="activeTabPath"
              type="card"
              class="demo-tabs"
              @tab-click="tabClick"
              @tab-remove="removeTab"
            >
              <el-tab-pane
                v-for="item in tabStore.tabList"
                :key="item.name"
                :label="item.title"
                :name="item.path"
                :closable="item.close"
              >
                <template #label>
                  <el-icon class="tabs-icon" v-if="item.icon">
                    <component :is="item.icon"></component>
                  </el-icon>
                  {{ item.title }}
                </template>
              </el-tab-pane>

              <!-- <button @click="tabStore.removeAllTabs()">清空</button>
              <button
                @click="
                  tabStore.addTabs({
                    name: 'home',
                    path: '/home',
                    title: '首页',
                    close: false,
                    icon: 'home-filled',
                  })
                "
              >
                初始化
              </button> -->
            </el-tabs>
          </div>
        </el-header>

        <el-main
          bg="#edeff2"
          class="min-h-[calc(100vh-120px)]"
          box="border"
          relative
        >
          <!-- class="h-[calc(100%-10px)]]" -->
          <router-view bg="#fff" w="100%" h="94%" />

          <div
            w="100%"
            h="40px"
            flex
            items-center
            justify-center
            bg="#fff"
            absolute
            bottom-0px
            left-0px
            color="#858585"
          >
            2022@Soumns-Admin By Soumns777
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  --el-header-height: 90px;
}

.el-menu--popup {
  .el-menu-item {
    background-color: #191a20;
    i {
      margin-right: 5px;
    }
    &:hover {
      i,
      span {
        color: #ffffff !important;
      }
    }
    &.is-active {
      background-color: #060708 !important;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background: $primary-color;
        content: '';
      }
      i,
      span {
        color: #ffffff !important;
      }
    }
  }
}
.href {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #bdbdc0;
  text-decoration: none;
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

.el-menu {
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  border-right: none;
  .el-menu-item {
    &.is-active {
      background-color: #060708 !important;
    }
    &.is-active::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      background: $primary-color;
      content: '';
    }
  }
}
</style>
