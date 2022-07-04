<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';
import { Sunny, Moon } from '@element-plus/icons-vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <el-switch
    v-model="isDark"
    @change="toggleDark()"
    inline-prompt
    active-color="#0a0a0a"
    inactive-color="#dcdfe6"
    :active-icon="Sunny"
    :inactive-icon="Moon"
  />
</template>

<style scoped lang="scss"></style>
