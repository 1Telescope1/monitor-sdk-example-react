import { Alert, Button, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Click() {
  const message = '监听click点击事件'
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
    },
    {
      title: '类型',
      dataIndex: 'subType',
      key: 'subType',
      width: '80px',
    },
    {
      title: '页面路径',
      dataIndex: 'pageUrl',
      key: 'pageUrl',
      width: '80px',
    },
    {
      title: '点击的元素类型',
      dataIndex: 'tagName',
      key: 'tagName',
      width: '80px',
    },
    {
      title: '发生时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '120px',
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
  ]

  const getClickList = () => {
    setLoading(true)
    axios.get('/api/click').then(res => {
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

  useEffect(() => {
    getClickList()
  }, [])

  return (
    <div>
      <Alert message={message} type="success" />
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={getClickList}>获取最新数据</Button>
      </div>
      <Table loading={loading} rowKey='index' dataSource={dataSource} columns={columns}
        scroll={{ x: 1500 }}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p>dom的path：</p>
              <p>{record.path}</p>
            </div>
          ),
        }}
      />
    </div>
  )
}

export default Click