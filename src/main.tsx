import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import monitorSDK from 'monitor-sdk'
import axios from 'axios';
import { notification } from 'antd';
import Description from './components/description.tsx';
import { config } from './config/index.ts';

// @ts-ignore
window.monitor = {}
// @ts-ignore
window.monitor.config = config
monitorSDK.init(config)
// monitorSDK.Behavior()
// monitorSDK.Performance()
monitorSDK.Error.initErrorEventListener()
monitorSDK.Behavior()
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


const webUrl = "http://localhost:5173"

// 监听 fetch 请求
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  return response;
};


// 监听 XMLHttpRequest 请求
const originalXHR = window.XMLHttpRequest;
// @ts-ignore
window.XMLHttpRequest = function () {
  const xhr = new originalXHR();
  xhr.addEventListener('load', () => {
    const url = xhr.responseURL
    if (url.includes(webUrl)) return
    const response = JSON.parse(xhr.response)
    if (url === config.url) {
      notification.open({
        message: '批量发送了数据到服务端',
        description: <Description data={response.data} />
      });
    }
  });
  return xhr;
};

createRoot(document.getElementById('root')!).render(
  // @ts-ignore
  <ErrorBoundary Fallback={ErrorFallback}>
    <App />
  </ErrorBoundary>
  // <App />
)
