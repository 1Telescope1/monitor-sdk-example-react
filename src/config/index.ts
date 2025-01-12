export const config = {
  url: 'http://127.0.0.1:3000/api/data', // 上报地址
  projectName: 'monitor', // 项目名称
  appId: '123456', // 项目id
  userId: '123456', // 用户id
  isAjax: false, // 是否开启ajax上报
  batchSize: 5, // 批量上报大小
  containerElements: ['html', 'body', '#app', '#root'], // 容器元素
  skeletonElements: [], // 骨架屏元素
  reportBefore: () => {}, // 上报前回调
  reportAfter: () => {}, // 上报后回调
  reportSuccess: () => {}, // 上报成功回调
  reportFail: () => {}, // 上报失败回调
}