<script lang="ts" setup>
import { IGenderType, IPage, ITable, TableList } from '@/libs/types';
import { ElMessage, ElMessageBox, MessageHandle } from 'element-plus';
import EditUser from '@/views/excel/components/editUser.vue';
import ImportExcel from '@/components/ImportExcel/index.vue';
import { GENDER_TYPE } from '@/libs/constant';
import {
  Refresh,
  CirclePlus,
  Delete,
  Search,
  EditPen,
  Download,
  Upload,
  View,
} from '@element-plus/icons-vue';
import {
  addUser,
  delUser,
  editUser,
  exportUser,
  batchAddUser,
} from '@/services/request';
import { useDownload } from '@/hooks/useDownload';

// defineProps
interface ISearchFormProps {
  searchParams: Partial<ITable>;
  init: () => Promise<MessageHandle | undefined>;
  tableData: TableList;
  pageAble: IPage;
}

const props = withDefaults(defineProps<ISearchFormProps>(), {});

const { searchParams, init, tableData, pageAble } = toRefs(props);

// 搜素
const searchIt = () => {
  const { name, age, gender } = toRefs(searchParams.value);

  console.log(name, age, gender, '💛💙 测试');

  if (!(name?.value || age?.value || gender?.value)) {
    return ElMessage.warning('请先选择一个搜索项再进行搜索!');
  }

  init.value();
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
      init.value();
    })
    .catch(() => {
      console.log('💛💙 取消删除用户');
    });
};

// 重置
const reset = () => {
  searchParams.value.name = '';
  searchParams.value.age = '';
  searchParams.value.gender = '';
  init.value();
};

// 导出数据
const download = async () => {
  useDownload(exportUser, '导出数据用例', tableData.value);
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

// 分页
const changePageSize = (pageSize: number) => {
  pageAble.value.pageSize = pageSize;
  init.value();
};

const changePageNum = (pageNum: number) => {
  pageAble.value.pageNum = pageNum;
  init.value();
};

// 表格操作
let multiSselects = $ref<TableList>([]);

const selectionChange = (rowArr: TableList) => {
  multiSselects = rowArr;
  console.log(multiSselects, '💛💙 selectionChange');
};

// 跨页面选择时需要
const getRowKeys = (row: ITable) => {
  return row.id;
};

onMounted(() => {
  init.value();
});
</script>

<template>
  <div class="table-box">
    <!-- 搜索表单部分 -->
    <el-form
      ref="formRef"
      :model="searchParams"
      :inline="true"
      label-width="100px"
      m="t10px l20px"
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
          @click="searchIt()"
        >
          <i m="r24px">
            <Search absolute w="18px" h="18px" left-17px top-6px />
          </i>
        </button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮部分 -->
    <div flex items-center m="t10px b20px l20px">
      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 border-none cursor-pointer"
        relative
        m="10px"
        @click="openDrawer('新增')"
      >
        <i m="r24px">
          <CirclePlus absolute w="18px" h="18px" left-16px top-8px />
        </i>

        新增用户
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-pink-500 border-none cursor-pointer"
        relative
        m="10px"
        @click="download()"
      >
        <i m="r24px">
          <Download absolute w="18px" h="18px" left-16px top-8px />
        </i>

        导出数据
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-cyan-500 border-none cursor-pointer"
        relative
        m="10px"
        @click="batchAdd()"
      >
        <i m="r24px">
          <Upload absolute w="18px" h="18px" left-16px top-8px />
        </i>

        导入数据
      </button>

      <button
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-orange-500 border-none cursor-pointer"
        relative
        m="10px"
        @click="reset()"
      >
        <i m="r24px">
          <Refresh absolute w="18px" h="18px" left-18px top-8px />
        </i>
        重置
      </button>

      <!-- 插槽  自定义操作 -->
      <slot name="operation" :multiSselects="multiSselects"> </slot>
    </div>

    <!-- 表格部分 -->
    <el-table
      :data="tableData"
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

    <!-- 分页 -->
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
  </div>

  <EditUser ref="editUserExpose" />
  <ImportExcel ref="importExcelExpose" />
</template>

<style scoped lang="scss"></style>
