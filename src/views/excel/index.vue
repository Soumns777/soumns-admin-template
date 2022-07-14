<script lang="ts" setup>
import { TableList } from '@/libs/types';
import { initTable, uploadImgs } from '@/services/request';
import {
  Refresh,
  CirclePlus,
  Delete,
  Search,
  EditPen,
  Download,
  Upload,
  View,
  ArrowDown,
  ArrowUp,
} from '@element-plus/icons-vue';
import axios from 'axios';
import qs from 'qs';

const handleClick = () => {
  console.log('click');
};

let tableData: TableList = $ref([]);

const init = async () => {
  const { data: res } = await initTable({
    uName: 'admin',
  });
  tableData = res;
  console.log(res, '💛💙 初始化admin表格数据');
};

// const uploadImages = async () => {
//   let formData = new FormData();
//   formData.append('name', '小红');
//   formData.append('age', '18');
//   const res = await uploadImgs(formData);
// };

onMounted(() => {
  init();
  // uploadImages();
});
</script>

<template>
  <div class="table-box">
    <el-table :data="tableData" height="575" :border="true" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column
        fixed
        prop="date"
        label="Date"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="Name"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="state"
        label="State"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="city"
        label="City"
        width="120"
        show-overflow-tooltip
      />

      <el-table-column
        prop="age"
        label="Age"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="Address"
        width="600"
        show-overflow-tooltip
      />
      <el-table-column
        prop="zip"
        label="Zip"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        fixed="right"
        width="200"
        show-overflow-tooltip
      >
        <el-button type="primary" link :icon="View">查看</el-button>
        <el-button type="primary" link :icon="EditPen">编辑</el-button>
      </el-table-column>
      <template #empty>
        <div class="table-empty">
          <img src="@/assets/uploads/notData.png" alt="notData" />
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
