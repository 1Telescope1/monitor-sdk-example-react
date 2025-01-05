import { TabsProps, Tabs } from 'antd';
import React from 'react'
import Tracker from './components/Tracker';
import Pv from './components/Pv';
import Click from './components/Click';

function Behaviour() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'PV页面信息',
      children: <Pv></Pv>,
    },
    {
      key: '2',
      label: '点击事件',
      children: <Click></Click>,
    },
    {
      key: '3',
      label: '自定义埋点',
      children: <Tracker></Tracker>,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Behaviour