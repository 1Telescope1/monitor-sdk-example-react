import { Alert, Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Load() {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const message = '浏览器触发load事件后开始收集，采用new PerformanceObserver()的方式'

  useEffect(() => {
    getLoadList()
  }, [])

  const getLoadList = () => {
    setLoading(true)
    axios.get('/api/load').then(res => {
      const data = res.data.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      })
      setDataSource(data)
      setLoading(false)
    })
  }

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
      dataIndex: 'subType',
      key: 'subType',
      width: '100px',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '性能条目开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '130px',
      render: (text) => text.toFixed(2)
    },
    {
      title: '性能条目持续时间',
      dataIndex: 'duration',
      key: 'duration',
      width: '100px',
      render: (text) => text.toFixed(2)
    },
    {
      title: '绘制元素的大小（px）',
      dataIndex: 'size',
      key: 'size',
      width: '100px',
    },
    {
      title: '元素加载完成时间',
      dataIndex: 'loadTime',
      key: 'loadTime',
      width: '100px',
    },
  ];
  return (
    <div>
      <Alert message={message} type="success" />
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={getLoadList}>获取最新数据</Button>
      </div>
      <Table loading={loading} rowKey='index' dataSource={dataSource} columns={columns}
        scroll={{ x: 1500 }}
      />
    </div>
  )
}

export default Load