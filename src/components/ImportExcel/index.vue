<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`批量添加${parameter.title}`"
    :destroy-on-close="true"
    width="580px"
    draggable
  >
    <el-form class="drawer-multiColumn-form" label-width="100px">
      <el-form-item label="模板下载 :">
        <el-button type="primary" :icon="Download" @click="downloadTemp"
          >点击下载</el-button
        >
      </el-form-item>
      <el-form-item label="文件上传:">
        <el-upload
          action="string"
          class="upload"
          :drag="true"
          name="file"
          :limit="excelLimit"
          :multiple="true"
          :show-file-list="true"
          :http-request="uploadExcel"
          :before-upload="beforeExcelUpload"
          :on-exceed="handleExceed"
          :on-success="excelUploadSuccess"
          :on-error="excelUploadError"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">请上传 .xls , .xlsx 标准格式文件</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="数据覆盖 :">
        <el-switch v-model="isCover"> </el-switch>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { useDownload } from '@/hooks/useDownload';
import { Download } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { zhCn } from 'element-plus/es/locale';

export interface ExcelParameterProps {
  title: string; // 标题
  tempUrl: (params: any) => Promise<any>; // 下载模板的Api
  importUrl: (params: any) => Promise<any>; // 批量导入的Api
  getTableList: () => Promise<any>; // 获取表格数据的Api
}

// 是否覆盖数据
const isCover = $ref(false);
// 最大文件上传数
const excelLimit = $ref(1);
// dialog状态
let dialogVisible = $ref(false);
// 父组件传过来的参数
let parameter = $ref<Partial<ExcelParameterProps>>({});

// 接收父组件参数
const acceptParams = (params?: any): void => {
  parameter = params;
  dialogVisible = true;
};

// Excel模板下载
const downloadTemp = () => {
  if (!parameter.tempUrl) return;
  useDownload(parameter.tempUrl, `${parameter.title}模板`);
};

// 文件上传
const uploadExcel = async (param: any) => {
  let excelFormData = new FormData();
  excelFormData.append('file', param.file);
  excelFormData.append('isCover', isCover as unknown as Blob);

  const res = parameter.importUrl && (await parameter.importUrl(excelFormData));

  console.log(res, '💛💙 res');
  if (res.RESULT_CODE !== '0000') return param.onError();
  parameter.getTableList && parameter.getTableList();
  dialogVisible = false;
};

// 文件上传之前判断
const beforeExcelUpload = (file: any) => {
  const isExcel =
    file.type === 'application/vnd.ms-excel' ||
    file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isExcel)
    ElNotification({
      title: '温馨提示',
      message: '上传文件只能是 xls / xlsx 格式！',
      type: 'warning',
    });
  if (!isLt5M)
    ElNotification({
      title: '温馨提示',
      message: '上传文件大小不能超过 5MB！',
      type: 'warning',
    });
  return isExcel && isLt5M;
};

// 文件数超出提示
const handleExceed = (): void => {
  ElNotification({
    title: '温馨提示',
    message: '最多只能上传一个文件！',
    type: 'warning',
  });
};
// 上传错误提示
const excelUploadError = (): void => {
  ElNotification({
    title: '温馨提示',
    message: '导入数据失败，请您重新上传！',
    type: 'error',
  });
};
// 上传成功提示
const excelUploadSuccess = (): void => {
  ElNotification({
    title: '温馨提示',
    message: '导入数据成功！',
    type: 'success',
  });
};

defineExpose({
  acceptParams,
});
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
