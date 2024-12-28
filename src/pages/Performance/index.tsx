import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Resource from './components/resource';
import Load from './components/load';
import Ajax from './components/ajax';

function Performance() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '资源加载',
      children: <Resource></Resource>,
    },
    {
      key: '2',
      label: 'FCP、LCP、FP、LOAD',
      children: <Load></Load>,
    },
    {
      key: '3',
      label: 'Fetch、XHR',
      children: <Ajax></Ajax>,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items}/>
    </div>
  )
}

export default Performance