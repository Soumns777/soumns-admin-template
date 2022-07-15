<script lang="ts" setup>
import { ITable, TableList } from '@/libs/types';
import { initTable, addUser, delUser, editUser } from '@/services/request';
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
import { ElMessage } from 'element-plus';
import EditUser from './components/editUser.vue';

//  初始化表格数据
let tableData: TableList = $ref([]);

const init = async () => {
  const {
    data: res,
    RESULT_CODE,
    RESULT_MSG,
  } = await initTable({
    uName: 'admin',
  });

  if (RESULT_CODE == '0000') {
    tableData = res;
  } else {
    return ElMessage.error(RESULT_MSG);
  }
};

onMounted(() => {
  init();
});

interface IEditExpose {
  acceptParams: (params: any) => void;
}
let editUserRef: IEditExpose = $ref();

// 新增用户
const add = async () => {
  // const { RESULT_CODE, RESULT_MSG } = await addUser({
  //   id: '1',
  //   date: '2022-01-16',
  //   name: 'iu',
  //   gender: 'former',
  //   age: 22,
  //   state: 'HeFei',
  //   city: 'Anhui',
  //   address: '安徽合肥',
  //   zip: '90036',
  //   tag: '老家',
  // });
  // if (RESULT_CODE != '0000') {
  //   return ElMessage.error(RESULT_MSG);
  // } else {
  //   ElMessage.success(RESULT_MSG);
  // }
  // init();

  let params = {
    title: '查看',
    isView: true,
    apiUrl: '新增',
  };

  editUserRef.acceptParams(params);
};

// 删除用户
const del = async () => {
  const { RESULT_CODE, RESULT_MSG } = await delUser({ id: '1' });

  if (RESULT_CODE != '0000') {
    return ElMessage.error(RESULT_MSG);
  } else {
    ElMessage.success(RESULT_MSG);
  }
  init();
};

// 编辑用户
const edit = async () => {
  const { RESULT_CODE, RESULT_MSG } = await editUser({
    id: '1',
    data: {
      date: '2022-02-02',
      name: 'yoona',
      gender: 'former',
      age: 28,
      state: 'Wuhui',
      city: 'Anhui',
      address: '安徽芜湖',
      zip: '90036',
      tag: '老家',
    },
  });

  if (RESULT_CODE != '0000') {
    return ElMessage.error(RESULT_MSG);
  } else {
    ElMessage.success(RESULT_MSG);
  }
  init();
};
</script>

<template>
  <div class="table-box">
    <div flex items-center m="t10px b20px">
      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 border-none cursor-pointer"
        m="10px"
        w="130px"
        @click="add()"
      >
        新增用户
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-orange-500 border-none cursor-pointer"
        m="10px"
        w="130px"
        @click="del()"
      >
        删除用户
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 border-none cursor-pointer"
        m="10px"
        w="130px"
        @click="edit()"
      >
        编辑用户
      </button>
    </div>

    <el-table :data="tableData" height="575" :border="true" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="150"
        show-overflow-tooltip
      />
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

    <EditUser ref="editUserRef" />
  </div>
</template>

<style scoped lang="scss"></style>
