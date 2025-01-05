import { Alert, Button, Col, Form, Input, Row, Select, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import monitorSDK from 'monitor-sdk';

const trackerFn = monitorSDK.getBehaviour().customHandler
const { Option } = Select;

function Tracker() {
  const message = '自定义埋点'
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
      title: '埋点Key',
      key: 'eventKey',
      dataIndex: 'eventKey',
      width: '80px'
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

  const getTrackerList = () => {
    setLoading(true)
    axios.get('/api/tracker').then(res => {
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
    getTrackerList()
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values);
    const reportData = {
      eventKey: values.eventKey,
      eventAction: values.eventAction,
      eventData: {
        username: values.username,
        password: values.password
      }
    }
    trackerFn(reportData)
  };

  return (
    <div>
      <Alert message={message} type="success" />
      <div style={{ marginTop: '10px' }}>
        <Row>
          <Col span={12}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="埋点key值"
                name="eventKey"
                rules={[{ required: true, message: 'Please input your eventKey!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="eventAction" label="触发条件" rules={[{ required: true }]}>
                <Select
                  allowClear
                >
                  <Option value="load">load</Option>
                  <Option value="click">click</Option>
                  <Option value="expose">expose</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="埋点数据username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="埋点数据password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  上报埋点
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={getTrackerList}>获取最新数据</Button>
      </div>
      <Table loading={loading} rowKey='index' dataSource={dataSource} columns={columns}
        scroll={{ x: 1500 }}
        expandable={{
          expandedRowRender: (record) => {
            const str = JSON.stringify(record.eventData)
            return <div>
              <p>埋点数据</p>
              <p>{str}</p>
            </div>
          }
        }}
      />
    </div >
  )
}

export default Tracker