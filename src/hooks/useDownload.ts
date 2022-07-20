import { ElNotification } from 'element-plus';

/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param url 导出表格的api地址(必传)
 * @param fileName 导出的文件名(必传)
 * @param params 导出的参数(默认为空对象)
 * @param isNotify 是否有导出消息提示(默认为 true)
 * @param fileType 导出的文件格式(默认为.xlsx)
 * */
export const useDownload = async (
  url: (param: any) => Promise<any>,
  fileName: string,
  params: any = {},
  isNotify: boolean = true,
  fileType: string = '.xlsx'
) => {
  if (isNotify) {
    ElNotification({
      title: '温馨提示',
      message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！',
      type: 'warning',
      duration: 3000,
    });
  }
  try {
    const res = await url({
      data: params,
      fileName,
      keys: [
        'id',
        'name',
        'gender',
        'age',
        'idCard',
        'email',
        'address',
        'createdDate',
      ],
    });

    // 这个地方的type,经测试不传也没事，因为zip文件不知道type是什么
    // const blob = new Blob([res], {
    // 	type: "application/vnd.ms-excel;charset=UTF-8"
    // });
    const blob = new Blob([res]);
    const nav = window.navigator as any;
    // 兼容edge不支持createObjectURL方法
    if ('msSaveOrOpenBlob' in nav)
      return nav.msSaveOrOpenBlob(blob, fileName + fileType);
    const blobUrl = window.URL.createObjectURL(blob);
    const exportFile = document.createElement('a');
    exportFile.style.display = 'none';
    exportFile.download = `${fileName}${fileType}`;
    exportFile.href = blobUrl;
    document.body.appendChild(exportFile);
    exportFile.click();
    // 去除下载对url的影响
    document.body.removeChild(exportFile);
    window.URL.revokeObjectURL(blobUrl);

    // const nav = window.navigator as any;
    // if ('msSaveOrOpenBlob' in nav)
    //   return nav.msSaveOrOpenBlob(blob, fileName + fileType);
    // let blobUrl = window.URL.createObjectURL(blob);
    // let a = document.createElement('a');
    // a.href = blobUrl;
    // a.download = `${fileName}${fileType}`;
    // document.body.appendChild(a);
    // a.click();
    // a.remove();

    // document.body.removeChild(a);
    // window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log(error);
  }
};
