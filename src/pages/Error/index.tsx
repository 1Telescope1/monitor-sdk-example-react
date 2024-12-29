import { TabsProps, Tabs } from 'antd';
import React from 'react'
import NormalError from './components/normalError';
import ResourceError from './components/resourceError';

function Error() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '普通错误',
      children: <NormalError></NormalError>,
    },
    {
      key: '2',
      label: '资源加载错误',
      children: <ResourceError></ResourceError>,
    }
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Error