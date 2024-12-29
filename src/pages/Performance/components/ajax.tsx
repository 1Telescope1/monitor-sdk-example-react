import { Alert, Button, Space, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Ajax() {
  const message = '通过重写xhr和fetch实现监控请求, axios的底层原理是xhr'
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
      title: '请求类型',
      dataIndex: 'subType',
      key: 'subType',
      width: '120px',
    },
    {
      title: '请求参数',
      dataIndex: 'params',
      key: 'params',
      width: '100px',
    },
    {
      title: '请求地址',
      dataIndex: 'url',
      key: 'url',
      width: '200px',
    },
    {
      title: '页面url',
      dataIndex: 'pageUrl',
      key: 'pageUrl',
      width: '230px',
    },
    {
      title: '请求状态码',
      dataIndex: 'status',
      key: 'status',
      width: '130px',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
      width: '100px',
    },
    {
      title: '请求开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '120px',
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
    {
      title: '请求结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: '120px',
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
    {
      title: '请求持续时间',
      dataIndex: 'duration',
      key: 'duration',
      width: '120px',
    },
    {
      title: '是否请求成功',
      dataIndex: 'success',
      key: 'success',
      width: '120px',
      render: (text) => {
        return text ? '是' : '否'
      }
    },
  ];

  const getAjaxList = () => {
    setLoading(true)
    axios.get('/api/ajax').then(res => {
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

  useEffect(() => {
    getAjaxList()
  }, [])

  const axiosApi = (method, flag) => {
    const url = `/api/${method}`
    if (flag) {
      if (method === 'post') {
        axios.post(url, {
          name: '张三',
          age: 18
        })
      } else if (method === 'get') {
        axios.get(url, {
          params: {
            name: '张三',
            age: 18
          }
        })
      }
    } else {
      if (method === 'post') {
        axios.post(url + '123', {
          name: '张三',
          age: 18
        })
      } else if (method === 'get') {
        axios.get(url + '123', {
          params: {
            name: '张三',
            age: 18
          }
        })
      }
    }
  }

  const fetchApi = (method, flag) => {
    const url = `http://127.0.0.1:3000/api/${method}`
    if (flag) {
      if (method === 'post') {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: '张三',
            age: 18
          })
        })
      } else if (method === 'get') {
        fetch(url + '?name=张三&age=18')
      }
    } else {
      if (method === 'post') {
        fetch(url + '123', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: '张三',
            age: 18
          })
        })
      } else if (method === 'get') {
        fetch(url + '123' + '?name=张三&age=18')
      }
    }
  }

  const batchAjax = () => {
    for (let i = 0; i < 30; i++) {
      axiosApi('get', true)
    }
  }

  return (
    <div>
      <Alert message={message} type="success" />
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => axiosApi('get', true)}>正确xhr的get请求</Button>
          <Button type="primary" onClick={() => axiosApi('post', true)}>正确xhr的post请求</Button>
          <Button type="primary" danger onClick={() => axiosApi('get', false)}>异常xhr的get请求</Button>
          <Button type="primary" danger onClick={() => axiosApi('post', false)}>异常xhr的post请求</Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => fetchApi('get', true)}>正确fetch的get请求</Button>
          <Button type="primary" onClick={() => fetchApi('post', true)}>正确fetch的post请求</Button>
          <Button type="primary" danger onClick={() => fetchApi('get', false)}>异常fetch的get请求</Button>
          <Button type="primary" danger onClick={() => fetchApi('post', false)}>异常fetch的post请求</Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={batchAjax}>快速发送30个请求</Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={getAjaxList}>获取最新数据</Button>
      </div>
      <Table loading={loading} rowKey='index' dataSource={dataSource} columns={columns}
        scroll={{ x: 1500 }}
      />
    </div>
  )
}

export default Ajax