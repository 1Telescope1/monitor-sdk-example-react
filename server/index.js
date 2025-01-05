import express from 'express';
import coBody from 'co-body'

// 创建一个 Express 应用
const app = express();

app.all('*', function(res, req, next) {
  req.header('Access-Control-Allow-Origin', '*')
  req.header('Access-Control-Allow-Headers', 'Content-Type')
  req.header('Access-Control-Allow-Methods', '*')
  req.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const resourceList = []
const loadList = []
const ajaxList = []

const normalErrList = []
const resourceErrList = []

const exceptionList = []
const whiteScreenList = []
const stutterList = []
const crashList = []

const pvList = []
const clickList = []
const trackerList = []

app.get('/api/hello', (req, res) => {
  res.json({ message: '请求成功' });
});

const unshiftData = (data) => {
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
    } else if (d.type === 'exception') {
      exceptionList.unshift(d)
      if (d.subType === 'whiteScreen') {
        whiteScreenList.unshift(d)
      } else if (d.subType === 'stutter') {
        stutterList.unshift(d)
      } else if (d.subType === 'crash') {
        crashList.unshift(d)
      }
    } else if (d.type === 'behavior') {
      if (d.subType === 'pv') {
        pvList.unshift(d)
      } else if (d.subType === 'click') {
        clickList.unshift(d)
      } else if (d.subType === 'tracker') {
        trackerList.unshift(d)
      }
    }
  })
}

app.post('/api/data', async (req, res) => {
  const contentType = req.headers['content-type'];
  let data = null
  if (contentType.includes('application/json')) {
    // ajax
    data = req.body.data;
  } else {
    // becon
    data = (await coBody.json(req)).data
  }
  unshiftData(data)
  res.json({ data });
});

// 图片上传的方式
app.get('/api/data', async (req, res) => {
  let data = req.query.data
  if (!data) return
  data = JSON.parse(JSON.parse(data)).data
  unshiftData(data)
  res.json({ data });
})

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

app.get('/api/exception', (req, res) => {
  res.json({ data: exceptionList });
})

app.get('/api/whiteScreen', (req, res) => {
  res.json({ data: whiteScreenList });
});

app.get('/api/stutter', (req, res) => {
  res.json({ data: stutterList });
});

app.get('/api/crash', (req, res) => {
  res.json({ data: crashList });
})

app.get('/api/pv', (req, res) => {
  res.json({ data: pvList });
});

app.get('/api/click', (req, res) => {
  res.json({ data: clickList });
});

app.get('/api/tracker', (req, res) => {
  res.json({ data: trackerList });
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