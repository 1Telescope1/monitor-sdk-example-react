import { Alert } from 'antd'
import React from 'react'

function Resource() {
  const message = '浏览器触发load事件后开始收集，采用new PerformanceObserver()的方式'

  return (
    <div>
      <Alert message={message} type="success" />
    </div>
  )
}

export default Resource