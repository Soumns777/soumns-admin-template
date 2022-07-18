<script lang="ts" setup>
import { ITable, ITableParam, TableList } from '@/libs/types';
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { zhCn } from 'element-plus/es/locale';
import EditUser from './components/editUser.vue';

// 分页
let pageAble = $ref({
  pageNum: 1, // 当前页页数
  pageSize: 3, // 每页显示条数
  total: 0, // 总条数
});

//  初始化表格数据
let tableData: TableList = $ref([]);
let tableParams = reactive<ITableParam>({
  uName: 'admin',
  pageNum: pageAble.pageNum,
  pageSize: pageAble.pageSize,
});

const init = async () => {
  console.log(tableParams, '💛💙 初始化表格数据请求参数');
  const {
    data: res,
    RESULT_CODE,
    RESULT_MSG,
    total,
  } = await initTable(tableParams);

  console.log(res, total, RESULT_CODE, RESULT_MSG, '💛💙 total pingation');

  if (RESULT_CODE == '0000') {
    tableData = res;
    pageAble.total = total;
  } else {
    return ElMessage.error(RESULT_MSG);
  }
};

onMounted(() => {
  init();
});

// 利用ref+defineExpose传递参数给子组件
interface IEditExpose {
  acceptParams: (params: any) => void;
}
let editUserRef: IEditExpose = $ref();

// 编辑用户 (新增、查看、编辑)
const openDrawer = async (title: string, rowData: Partial<ITable> = {}) => {
  let params = {
    title,
    rowData,
    isView: title == '查看' ? true : false,
    apiUrl: title === '新增' ? addUser : title === '编辑' ? editUser : '',
    getTableList: init,
  };

  editUserRef.acceptParams(params);
};

// 删除用户
const del = (rowData: ITable) => {
  ElMessageBox.confirm('您确定要删除当前用户吗?', '友情提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { RESULT_CODE, RESULT_MSG } = await delUser(rowData);

      if (RESULT_CODE != '0000') {
        return ElMessage.error(RESULT_MSG);
      }

      ElMessage.success(RESULT_MSG);
      console.log(RESULT_CODE, RESULT_MSG, '💛💙 删除用户成功');
      init();
    })
    .catch(() => {
      console.log('💛💙 取消删除用户');
    });
};

// 分页

const handleSizeChange = () => {
  console.log('💛💙 改变页数');
};
const handleCurrentChange = () => {
  console.log('💛💙 改变当前页');
};
</script>

<template>
  <div class="table-box">
    <div flex items-center m="t10px b20px">
      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 border-none cursor-pointer"
        m="10px"
        w="130px"
        @click="openDrawer('新增')"
      >
        新增用户
      </button>
    </div>

    <el-table :data="tableData" height="575" :border="true" style="width: 100%">
      <el-table-column type="selection" width="55" />

      <el-table-column
        prop="name"
        label="用户姓名"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="gender"
        label="性别"
        show-overflow-tooltip
        width="120"
        v-slot="scope"
      >
        {{ scope.row.gender == 'male' ? '男' : '女' }}
      </el-table-column>

      <el-table-column
        prop="age"
        label="年龄"
        width="120"
        show-overflow-tooltip
      />

      <el-table-column
        prop="idCard"
        label="身份证号"
        width="200"
        show-overflow-tooltip
      />

      <el-table-column
        prop="email"
        label="邮箱"
        width="200"
        show-overflow-tooltip
      />

      <el-table-column
        prop="address"
        label="现居地址"
        width="300"
        show-overflow-tooltip
      />

      <el-table-column
        prop="createdDate"
        label="创建时间"
        width="200"
        show-overflow-tooltip
      />

      <el-table-column label="操作" fixed="right" width="300" v-slot="scope">
        <el-button
          type="primary"
          link
          :icon="View"
          @click="openDrawer('查看', scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="primary" link :icon="Delete" @click="del(scope.row)"
          >删除</el-button
        >
      </el-table-column>

      <template #empty>
        <div class="table-empty">
          <img src="@/assets/uploads/notData.png" alt="notData" />
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>

    <el-pagination
      v-model:currentPage="pageAble.pageNum"
      v-model:page-size="pageAble.pageSize"
      :page-sizes="[3, 4, 5, 6]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageAble.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <EditUser ref="editUserRef" />
  </div>
</template>
