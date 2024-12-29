import { Alert, Button, Space, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function Resource() {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const message = '浏览器触发load事件后开始收集，采用new PerformanceObserver()的方式'

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
      ellipsis: true,
      tooltip: true,
    },
     {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '120px',
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
    {
      title: '资源类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
      width: '100px',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '资源地址',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
    },
    {
      title: '页面url',
      dataIndex: 'pageUrl',
      key: 'pageUrl',
      width: '200px',
    },
    {
      title: '加载时间',
      dataIndex: 'duration',
      key: 'duration',
      width: '100px',
      render: (text) => text.toFixed(2)
    },
    {
      title: '重定向时间',
      dataIndex: 'redirect',
      key: 'redirect',
      width: '130px',
      render: (text) => text.toFixed(2)
    },
    {
      title: 'dns时间',
      dataIndex: 'dns',
      key: 'dns',
      width: '100px',
      render: (text) => text.toFixed(2)
    },
    {
      title: 'tcp时间',
      dataIndex: 'tcp',
      key: 'tcp',
      width: '100px',
      render: (text) => text.toFixed(2)
    },
    {
      title: '首字节时间',
      dataIndex: 'ttfb',
      key: 'ttfb',
      width: '130px',
      render: (text) => text.toFixed(2)
    },
    {
      title: '请求内容大小',
      dataIndex: 'transferSize',
      key: 'transferSize',
      width: '130px',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '响应体大小',
      dataIndex: 'responseBodySize',
      key: 'responseBodySize',
      width: '100px',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '资源解压后的大小',
      dataIndex: 'resourceSize',
      key: 'resourceSize',
      width: '150px',
      ellipsis: true,
      tooltip: true,
    }
  ];

  useEffect(() => {
    getResourceList()
  }, [])

  const getResourceList = () => {
    setLoading(true)
    axios.get('/api/resource').then(res => {
      const data = res.data.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      })
      setDataSource(data)
    }).finally(() => {
      setLoading(false)
    })
  }

  const addScript = (flag) => {
    const script = document.createElement('script')
    if (flag) {
      script.src = 'https://cdn.jsdelivr.net/npm/lodash'
    } else {
      script.src = 'https://cdn.jsdelivr.net/npm/lodash123'
    }
    document.head.appendChild(script)
  }

  const addLink = () => {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'https://ahooks.js.org/useExternal/bootstrap-badge.css'
    document.head.appendChild(link)
  }


  const imgRef = useRef(null);
  const addImg = (flag) => {
    const img = document.createElement('img');
    img.src = flag ? 'https://p6-passport.byteacctimg.com/img/user-avatar/942c75c68025f9042d901c79ea1ba590~180x180.awebp' : 'https://1234';
    img.alt = '插入的图片';
    img.style.width = '50px'; // 设置图片宽度
    img.style.height = '50px'; // 设置图片高度
    img.style.marginLeft = '10px'; // 设置图片与按钮之间的间距

    // 将图片插入到按钮旁边的容器中
    const container = document.querySelector('.image-container');
    if (container) {
      container.appendChild(img);
    }
  }

  return (
    <div>
      <Alert message={message} type="success" />
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => addScript(true)}>插入正确script</Button>
          <Button type="primary" danger onClick={() => addScript(false)}>插入错误script</Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={addLink}>插入link标签</Button>
          <span className="mb badge badge-pill badge-primary">我是小demo</span>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => addImg(true)}>插入正确img</Button>
          <Button type="primary" danger onClick={() => addImg(false)}>插入异常img</Button>
          <div className="image-container" ref={imgRef} />
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={getResourceList}>获取最新数据</Button>
      </div>
      <Table loading={loading} rowKey='index' dataSource={dataSource} columns={columns}
        scroll={{ x: 1500 }}
      />
    </div>
  )
}

export default Resource