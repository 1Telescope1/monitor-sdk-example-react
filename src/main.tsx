import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import monitorSDK from 'monitor-sdk'
import axios from 'axios';
import { notification } from 'antd';
import Description from './components/description.tsx';
import { config } from './config/index.ts';

const reportAfter = (data) => {
  notification.open({
    message: '批量发送了数据到服务端',
    description: <Description data={data} />,
    duration: 2.5
  });
}
const options = {
  ...config,
  reportAfter
}

monitorSDK.init(options)
monitorSDK.Performance()
monitorSDK.Error.initErrorEventListener()
monitorSDK.Behavior()
monitorSDK.Exception()
const ErrorBoundary = monitorSDK.Error.ErrorBoundary
function ErrorFallback({ error }: { error: any }) {
  console.log(error);
  return <div>发生错误: {error.message},请稍后重试。</div>;
}

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')!).render(
  // @ts-ignore
  <ErrorBoundary Fallback={ErrorFallback}>
    <App />
  </ErrorBoundary>
  // <App />
)
