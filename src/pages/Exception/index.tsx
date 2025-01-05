import { Alert, Button, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import monitorSDK from 'monitor-sdk'
import ReplayComponent from '../../components/ReplayComponent';


const Description = () => {
  return (
    <div>
      <h3>白屏监控方案 - 采用采样打点的方案</h3>
      <p>1. 检测根节点是否渲染 - 不准确，不通用、骨架屏不支持</p>
      <p>2. Mutation Observer 监听DOM - 判断大量dom消失或者全部消失。不准确、骨架屏不支持</p>
      <p>3. 图片对比算法 - 准确，但是需要截图canvas，性能有影响、骨架屏需要换图片</p>
      <p>4. 采样打点 - 以xy坐标轴分为若干个（9、9）点，document.elementFromPoint这个api去判断点是否有dom</p>
      <h3>卡顿监控 - 根据requestAnimationFrame计算一s有多少FPS，低于24判断卡顿</h3>
      <h3>崩溃监控 - 启用webWorker，主线程很长时间没与子线程通信则判断崩溃</h3>
    </div>
  );
};

function Exception() {
  const message = '白屏监控方案 - 采用采样打点的方案';

  // 实现页面白屏
  const triggerWhiteScreen = () => {
    // 清空页面内容
    document.body.innerHTML = '';
  };

  const triggerStutter = () => {
    for (let i = 0; i < 5; i++) {
      const end = Date.now() + 300; // 阻塞 300 毫秒
      while (Date.now() < end) {
      }
    }
  }

  const triggerCrash = () => {
    while (1) { }
  }

  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true)
  const getErrorList = () => {
    axios.get('/api/exception').then((res) => {
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

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '异常类型',
      dataIndex: 'subType',
      key: 'subType',
    },
    {
      title: '异常页面',
      dataIndex: 'pageUrl',
      key: 'pageUrl',
    },
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <Space>
            <Button type='primary' onClick={() => replay(record)}>播放错误录屏</Button>
          </Space>
        )
      }
    }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<any>(); // 存储录制的事件
  const replay = (record) => {
    const { eventData } = record
    const evnents = monitorSDK.unzipRecordscreen(eventData)
    setEvents(evnents)
    setIsModalOpen(true)
  };

  useEffect(() => {
    getErrorList()
  }, [])

  return (
    <div>
      <Alert type="success" description={<Description />} />
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" danger onClick={triggerWhiteScreen}>
            触发白屏（使innerHtml为''）
          </Button>
          <Button type='primary' danger onClick={triggerStutter}>
            触发卡顿（while循环阻塞一段时间）
          </Button>
          <Button type='primary' danger onClick={triggerCrash}>
            触发崩溃（死循环）
          </Button>
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type='primary' onClick={getErrorList}>获取最新数据</Button>
      </div>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey={'index'}
      />
      {isModalOpen && <ReplayComponent events={events} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />}
    </div>
  );
}

export default Exception;
