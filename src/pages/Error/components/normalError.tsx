import { Alert, Button, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ErrorHighlighter from '../../../components/ErrorHighlighter';
import { record } from "rrweb";
import ReplayComponent from '../../../components/ReplayComponent';

function NormalError() {
  const message = "js错误通过监听error事件拦截，promise错误通过监听unhandledrejection事件拦截"
  const message1 = "react框架错误通过重写ErrorBoundary拦截，在组件抛出错误时error也会捕获到这次错误"

  const jsError = () => {
    const obj = {}
    // @ts-ignore
    obj.fn()
  }

  const promiseError = () => {
    new Promise((resolve, reject) => {
      reject('promise错误')
    })
  }

  const [isReactError, setIsReactError] = useState(false)
  const reactError = () => {
    setIsReactError(true)
  }

  function BuggyComponent() {
    throw new Error('组件抛出错误!');
  }

  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true)
  const gerErrorList = () => {
    setLoading(true)
    axios.get('/api/normalError').then((res) => {
      res.data = res.data.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      })
      setDataSource(res.data)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    gerErrorList()
  }, [])

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
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
      title: '错误id',
      dataIndex: 'errId',
      key: 'errId',
    },
    {
      title: '错误类型',
      dataIndex: 'subType',
      key: 'subType',
    },
    {
      title: '错误文件',
      dataIndex: 'src',
      key: 'src',
    },
    {
      title: '错误页面',
      dataIndex: 'pageUrl',
      key: 'pageUrl',
    },
    {
      title: '错误信息',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <Space>
            <Button type='primary'>播放</Button>
          </Space>
        )
      }
    }
  ]

  const [events, setEvents] = useState([]); // 存储录制的事件
  const recorderRef = useRef(null);
  const startRecord = () => {
    recorderRef.current = record({
      emit: (event) => {
        console.log(event, 'event');
        setEvents((prev) => [...prev, event]);
      },
    });
  }

  const replay = () => {
    setIsModalOpen(true)
  };

  const stopRecord = () => {
    if (recorderRef.current) {
      recorderRef.current();
      console.log("Recording stopped. Events:", events);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div>
      <Alert type="success" message={message} />
      <Alert type="success" message={message1} />
      {/* @ts-ignore */}
      {isReactError && <BuggyComponent />}
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type='primary' danger onClick={jsError}>Js-错误</Button>
          <Button type='primary' danger onClick={promiseError}>Promise-错误</Button>
          <Button type='primary' danger onClick={reactError}>react框架-错误</Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type='primary' onClick={startRecord}>开启错误录屏</Button>
          <Button type='primary' onClick={stopRecord}>关闭错误录屏</Button>
          <Button type='primary' onClick={replay}>播放</Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type='primary' onClick={gerErrorList}>获取最新数据</Button>
      </div>
      <Table
        rowKey={'index'}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <ErrorHighlighter filePath={record.src} errorLine={record.stack[0].lineno} errorColumn={record.stack[0].colno} />,
          rowExpandable: (record) => record.src,
        }}
      />
      {isModalOpen && <ReplayComponent events={events} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />}
    </div>
  )
}

export default NormalError