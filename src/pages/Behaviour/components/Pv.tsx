import { Alert, Button, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Pv() {
  const message = '页面加载来源解释'
  const description = () => {
    return (
      <div>
        <p>navigate - 网页通过点击链接,地址栏输入,表单提交,脚本操作等方式加载</p>
        <p>reload - 网页通过“重新加载”按钮或者location.reload()方法加载</p>
        <p>back_forward - 网页通过“前进”或“后退”按钮加载</p>
        <p>reserved - 任何其他来源的加载</p>
      </div>
    )
  }
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
      title: '页面标题',
      dataIndex: 'title',
      width: '80px',
      render: (text, record) => {        
        return record.pageInfo.title
      }
    },
    {
      title: '页面路径',
      dataIndex: 'href',
      width: '80px',
      render: (text, record) => {        
        return record.pageInfo.href
      }
    },
    {
      title: '网页尺寸',
      key: 'pageInfo',
      width: '80px',
      render: (text, record) => {        
        return text.pageInfo.winScreen
      }
    },
    {
      title: '页面来源',
      key: 'pageLoadType',
      width: '80px',
      render: (text, record) => {        
        return text.pageInfo.pageLoadType
      }
    },
    {
      title: '上报时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '120px',
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
  ]

  const getPvList = () => {
    setLoading(true)
    axios.get('/api/pv').then(res => {
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
    getPvList()
  }, [])

  return (
    <div>
      <Alert message={message} description={description()} type="success" />
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={getPvList}>获取最新数据</Button>
      </div>
      <Table loading={loading} rowKey='index' dataSource={dataSource} columns={columns}
        scroll={{ x: 1500 }}
      />
    </div>
  )
}

export default Pv