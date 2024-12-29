import express from 'express';
import cors from 'cors'

// 创建一个 Express 应用
const app = express();

// 使用 CORS 中间件，允许所cors
app.use(cors());

app.use(express.json());

const resourceList = []
const loadList = []
const ajaxList = []

const normalErrList = []
const resourceErrList = []

app.get('/api/hello', (req, res) => {
  res.json({ message: '请求成功' });
});

app.post('/api/data', (req, res) => {
  const { data } = req.body;
  Object.values(data).forEach(d => {
    if (d.type === 'performance') {
      if (d.subType === 'resource') {
        resourceList.unshift(...d.resourceList)
      } else if (d.subType === 'xhr' || d.subType === 'fetch') {
        ajaxList.unshift(d)
      } else {
        loadList.unshift(d)
      }
    } else if (d.type === 'error') {
      if (d.subType === 'resource') {
        resourceErrList.unshift(d)
      } else {
        normalErrList.unshift(d)
      }
    }
  })
  res.json({ data });
});

app.get('/api/resource', (req, res) => {
  res.json({ data: resourceList });
});

app.get('/api/load', (req, res) => {
  res.json({ data: loadList });
});

app.get('/api/ajax', (req, res) => {
  res.json({ data: ajaxList });
});

app.get('/api/normalError', (req, res) => {
  res.json({ data: normalErrList });
});

app.get('/api/resourceError', (req, res) => {
  res.json({ data: resourceErrList });
});

app.get('/api/get', (req, res) => {
  res.json({ data: 'get成功' });
});

app.post('/api/post', (req, res) => {
  res.json({ data: 'post成功' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`服务器正在端口 ${PORT} 上运行`);
});