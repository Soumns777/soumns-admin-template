<script lang="ts" setup>
import { IPage, ITable, ITableParam, TableList } from '@/libs/types';
import { initTable, delUser } from '@/services/request';
import { ElMessage, ElMessageBox } from 'element-plus';
import SoumnsTable from '@/components/SoumnsTable/index.vue';

// 搜索条件
let searchParams = $ref<Partial<ITable>>({
  name: '',
  gender: '',
  age: '',
});

// 分页
let pageAble = reactive<IPage>({
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

// 批量删除
const batchDel = async (rowData: any[]) => {
  if (!rowData.length) {
    return ElMessage.warning('请选选择需要删除的项!');
  }

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
      console.log(RESULT_CODE, RESULT_MSG, '💛💙 批量删除返回数据');
      init();
    })
    .catch(() => {
      console.log('💛💙 取消批量删除用户');
    });
};
</script>

<template>
  <div class="table-box">
    <!-- 搜搜表单部分 -->
    <SoumnsTable
      :searchParams="searchParams"
      :init="init"
      :tableData="tableData"
      :pageAble="pageAble"
    >
      <!-- 操作按钮部分 -->
      <template #operation="{ multiSselects }">
        <button
          class="font-semibold rounded-lg shadow-md text-white bg-red-500 border-none cursor-pointer"
          relative
          m="10px"
          @click="batchDel(multiSselects)"
          p="y8px x15px"
          text="center"
        >
          <i m="r24px">
            <Delete absolute w="18px" h="18px" left-16px top-8px />
          </i>

          <span>批量删除</span>
        </button>
      </template>
    </SoumnsTable>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form--inline .el-form-item) {
  margin-right: 0;
}
</style>
