
import React, { useEffect, useRef } from "react";
import "rrweb-player/dist/style.css";
import rrwebPlayer from "rrweb-player";
import { Modal } from "antd";
import style from "./index.module.css";

const ReplayComponent = ({ events, setIsModalOpen, isModalOpen }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (events && events.length > 0) {
      // 初始化播放器
      new rrwebPlayer({
        target: playerRef.current,
        props: {
          events,
          width: 960, // 设置播放器宽度
          height: 540, // 设置播放器高度
        },
      });
    }
  }, [events]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      width={1024} // Modal 宽度
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null} // 隐藏默认按钮
      centered // 让 Modal 居中显示
    >
      <div
        ref={playerRef}
        className={style.playerContainer}
        style={{
          width: "100%", // 让播放器宽度自适应 Modal
          height: "100%", // 让播放器高度自适应 Modal
        }}
      />
    </Modal>
  );
};

export default ReplayComponent;
