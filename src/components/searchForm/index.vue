<script lang="ts" setup>
import { IGenderType, ITable } from '@/libs/types';
import { MessageHandle } from 'element-plus';
interface ISearchFormProps {
  searchParams: Partial<ITable>;
  GENDER_TYPE: IGenderType[];
  init: () => Promise<MessageHandle | undefined>;
}

const props = withDefaults(defineProps<ISearchFormProps>(), {
  GENDER_TYPE: () => [],
});

const { searchParams, GENDER_TYPE, init } = toRefs(props);
</script>

<template>
  <div class="container">
    <el-form
      ref="formRef"
      :model="searchParams"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="用户姓名 :">
        <el-input
          v-model="searchParams.name"
          placeholder="请输入用户姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别 :">
        <el-select
          v-model="searchParams.gender"
          placeholder="请选择性别"
          clearable
        >
          <el-option
            v-for="item in GENDER_TYPE"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄 :">
        <el-input
          v-model="searchParams.age"
          placeholder="请输入年龄"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <button
          class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 border-none"
          relative
          type="button"
          m="l20px"
          w="50px"
          h="30px"
          @click="init()"
        >
          <Search absolute w="18px" h="18px" left-17px top-6px />
        </button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
