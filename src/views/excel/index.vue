<script lang="ts" setup>
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

const handleClick = () => {
  console.log('click');
};

const tableData = [
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
];
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
