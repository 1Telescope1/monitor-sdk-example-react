import React from 'react'
import styles from './index.module.css'
import { config } from '../config/index.ts'

// @ts-ignore
function Dscription(props: { data: any }) {
  const data = Object.values(props.data)  

  let trackerMethod = 'AJAX'
  if (config.isImageUpload) {
    trackerMethod = 'image'
  }
  if (config.isBeaconUpload) {
    trackerMethod = 'sendBecacon'
  }
  return (
    <div>
      <div className={styles.header}>打开控制台查看更多详情信息</div>
      <div className={styles.method}>发送方式： {trackerMethod}</div>
      <div className={styles.tableHeader}>
        <div className={styles.index}></div>
        <div className={styles.type}>type</div>
        <div className={styles.subType}>subType</div>
      </div>
      {
        data.map((item: any, index) => {
          return (
            <div key={index} className={styles.table}>
              <div className={styles.index}>{index + 1}</div>
              <div className={styles.type}>{item.type}</div>
              <div className={styles.subType}>{item.subType}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Dscription