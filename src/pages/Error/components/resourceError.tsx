import { Alert, Button, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ExpandDescription = ({ data }) => {
  const { html, path } = data;

  return (
    <div>
      <p>
        <strong>html：{html}</strong>
      </p>
      <p>
        <strong>路径：{path}</strong>
      </p>
    </div>
  )
}

function ResourceError() {
  const message = '资源错误通过监听error事件拦截';

  const imgRef = useRef();
  const audioRef = useRef();
  const videoRef = useRef();

  const loadImg = (flag) => {
    const img = document.createElement('img');
    img.src = flag
      ? 'https://p6-passport.byteacctimg.com/img/user-avatar/942c75c68025f9042d901c79ea1ba590~180x180.awebp'
      : 'https://1234';
    img.alt = '插入的图片';
    img.style.width = '50px'; // 设置图片宽度
    img.style.height = '50px'; // 设置图片高度
    img.style.marginLeft = '10px'; // 设置图片与按钮之间的间距

    // 将图片插入到按钮旁边的容器中
    const container = document.querySelector('.image-container');
    if (container) {
      container.appendChild(img);
    }
  };

  const loadAudio = (flag) => {
    const audio = document.createElement('audio');
    audio.src = flag
      ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      : 'https://1234';
    audio.controls = true;
    audio.style.marginLeft = '10px'; // 设置音频与按钮之间的间距

    audio.onerror = () => {
      console.error('音频加载失败');
      alert('音频加载失败');
    };

    audio.onloadeddata = () => {
      console.log('音频加载成功');
    };

    const container = document.querySelector('.audio-container');
    if (container) {
      container.appendChild(audio);
    }
  };


  const loadScript = (flag) => {
    const script = document.createElement('script');
    script.src = flag
      ? 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js' // 正确的脚本地址
      : 'https://invalid-url.js'; // 错误的脚本地址
    script.async = true; // 异步加载

    script.onload = () => {
      console.log('脚本加载成功');
      alert('脚本加载成功');
    };

    script.onerror = () => {
      console.error('脚本加载失败');
      alert('脚本加载失败');
    };

    document.body.appendChild(script); // 将脚本插入到 body 中
  };


  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const gerErrorList = () => {
    setLoading(true);
    axios.get('/api/resourceError').then((res) => {
      console.log(res.data);

      res.data = res.data.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });
      setDataSource(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
    },
    {
      title: '错误id',
      dataIndex: 'errId',
      key: 'errId',
      width: '80px',
    },
    {
      title: '错误类型',
      dataIndex: 'subType',
      key: 'subType',
      width: '80px',
    },
    {
      title: '错误标签',
      dataIndex: 'tagName',
      key: 'tagName',
      width: '80px',
    },
    {
      title: '错误资源',
      dataIndex: 'src',
      key: 'src',
      width: '80px',
    },
    {
      title: '错误资源',
      dataIndex: 'src',
      key: 'src',
      width: '80px',
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
  ]

  useEffect(() => {
    gerErrorList();
  }, [])

  const loadVideo = (flag) => {
    const video = document.createElement('video');
    video.src = flag
      ? 'https://www.w3schools.com/html/mov_bbb.mp4'
      : 'https://1234';
    video.controls = true;
    video.style.width = '200px'; // 设置视频宽度
    video.style.marginLeft = '10px'; // 设置视频与按钮之间的间距

    video.onerror = () => {
      console.error('视频加载失败');
      alert('视频加载失败');
    };

    video.onloadeddata = () => {
      console.log('视频加载成功');
    };

    const container = document.querySelector('.video-container');
    if (container) {
      container.appendChild(video);
    }
  };

  return (
    <div>
      <Alert type="success" message={message} />
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => loadScript(true)}>
            加载正确script
          </Button>
          <Button type="primary" danger onClick={() => loadScript(false)}>
            加载错误script
          </Button>
          <div className="image-container" ref={imgRef} />
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => loadImg(true)}>
            加载正确图片
          </Button>
          <Button type="primary" danger onClick={() => loadImg(false)}>
            加载错误图片
          </Button>
          <div className="image-container" ref={imgRef} />
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => loadAudio(true)}>
            加载正确音频
          </Button>
          <Button type="primary" danger onClick={() => loadAudio(false)}>
            加载错误音频
          </Button>
          <div className="audio-container" ref={audioRef} />
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Space>
          <Button type="primary" onClick={() => loadVideo(true)}>
            加载正确视频
          </Button>
          <Button type="primary" danger onClick={() => loadVideo(false)}>
            加载错误视频
          </Button>
          <div className="video-container" ref={videoRef} />
        </Space>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type='primary' onClick={gerErrorList}>获取最新数据</Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey={'index'}
        expandable={{
          expandedRowRender: (record) => <ExpandDescription data={record} />,
        }}
      />
    </div>
  );
}

export default ResourceError;
