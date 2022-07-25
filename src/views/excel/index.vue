<script lang="ts" setup>
import { ITable, ITableParam, TableList } from '@/libs/types';
import {
  initTable,
  addUser,
  delUser,
  editUser,
  exportUser,
  batchAddUser,
  testCancel,
} from '@/services/request';
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
import EditUser from './components/editUser.vue';
import { GENDER_TYPE } from '@/libs/constant';
import { useDownload } from '@/hooks/useDownload';
import ImportExcel from '@/components/ImportExcel/index.vue';
import { zhCn } from 'element-plus/es/locale';
// 搜索条件
let searchParams = $ref<Partial<ITable>>({
  name: '',
  gender: '',
  age: '',
});

// 分页
let pageAble = reactive({
  pageNum: 1, // 当前页页数
  pageSize: 7, // 每页显示条数
  total: 0, // 总条数
});

//  初始化表格数据
let tableData: TableList = $ref([]);
const tableParams = reactive<ITableParam>({
  uName: 'admin',
  pageNum: toRef(pageAble, 'pageNum'),
  pageSize: toRef(pageAble, 'pageSize'),
  search: searchParams,
});

const init = async () => {
  console.log(tableParams, '💛💙 init table params');

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

// 利用ref+defineExpose传递参数给子组件
interface IEditExpose {
  acceptParams: (params: any) => void;
}
let editUserExpose: IEditExpose = $ref();

// 编辑用户 (新增、查看、编辑)
const openDrawer = async (title: string, rowData: Partial<ITable> = {}) => {
  let params = {
    title,
    rowData,
    isView: title == '查看' ? true : false,
    apiUrl: title === '新增' ? addUser : title === '编辑' ? editUser : '',
    getTableList: init,
  };

  editUserExpose.acceptParams(params);
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
const changePageSize = (pageSize: number) => {
  pageAble.pageSize = pageSize;
  init();
};

const changePageNum = (pageNum: number) => {
  pageAble.pageNum = pageNum;
  init();
};

// 搜素
const searchIt = () => {
  const { name, age, gender } = toRefs(searchParams);

  console.log(name, age, gender, '💛💙 测试');

  if (!(name?.value || age?.value || gender?.value)) {
    return ElMessage.warning('请先选择一个搜索项再进行搜索!');
  }

  init();
};

// 检测搜索条件,没有筛选条件重置表格数据
// watchEffect(() => {
//   const { name, age, gender } = toRefs(searchParams);
//   if (!(name.value || age?.value || gender?.value)) {
//     init();
//   }
// });

// 重置
const reset = () => {
  searchParams.name = '';
  searchParams.age = '';
  searchParams.gender = '';
  init();
};

// 导出数据
const download = async () => {
  useDownload(exportUser, '导出数据用例', tableData);
};

// 导入数据
interface ImportExcelExpose {
  acceptParams: (params: any) => void;
}
const importExcelExpose = $ref<ImportExcelExpose>();
const batchAdd = async () => {
  let params = {
    title: '用户',
    tempUrl: exportUser, // 下载模板的api
    importUrl: batchAddUser, // 批量导入用户的api
    getTableList: init, // 操作成功之后刷新数据
  };

  importExcelExpose!.acceptParams(params);
};

// 编辑表格
const selectionChange = (rowArr: TableList) => {
  console.log(rowArr, '💛💙 selectionChange');
};

// 跨页面选择时需要
const getRowKeys = (row: ITable) => {
  return row.id;
};

onMounted(() => {
  init();
});
</script>

<template>
  <div class="table-box">
    <div flex items-center m="t10px l20px">
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
            class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 border-none cursor-pointer"
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

    <div flex items-center m="t10px b20px l20px">
      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 border-none cursor-pointer"
        relative
        m="10px"
        w="130px"
        @click="openDrawer('新增')"
      >
        <CirclePlus absolute w="18px" h="18px" left-16px top-8px />
        新增用户
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-pink-500 border-none cursor-pointer"
        relative
        m="10px"
        w="130px"
        @click="download()"
      >
        <Download absolute w="18px" h="18px" left-16px top-8px />
        导出数据
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-cyan-500 border-none cursor-pointer"
        relative
        m="10px"
        w="130px"
        @click="batchAdd()"
      >
        <Upload absolute w="18px" h="18px" left-16px top-8px />
        导入数据
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-orange-500 border-none cursor-pointer"
        relative
        m="10px"
        w="130px"
        @click="reset()"
      >
        <Refresh absolute w="18px" h="18px" left-30px top-8px />
        重置
      </button>
    </div>

    <el-table
      :data="tableData"
      height="575"
      :border="true"
      style="width: 100%"
      @selection-change="selectionChange"
      :row-key="getRowKeys"
    >
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
      :page-sizes="[3, 4, 5, 6, 7]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageAble.total"
      @size-change="changePageSize"
      @current-change="changePageNum"
    />

    <EditUser ref="editUserExpose" />
    <ImportExcel ref="importExcelExpose" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form--inline .el-form-item) {
  margin-right: 0;
}
</style>
