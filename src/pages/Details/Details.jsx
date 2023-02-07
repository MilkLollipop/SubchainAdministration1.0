import Details_ls from './Details.less';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import {
  DownloadOutlined,
  CopyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { Popover } from 'antd';
export default function Details(props) {
  const [see, setSee] = useState(1);
  function seeonclick(data) {
    setSee(data);
  }
  const content = (
    <div className={Details_ls.content}>
      <p>More Information</p>
    </div>
  );
  console.log(props.location.state);
  let value = {
    id: 1,
    chains: 'name',
    address: '0x123456789012345678901234567890012345678901234567890',
    time: '1675783941',
    price: '50000',
    volume: '$50000M',
    state: 'Need Deployment',
  };
  return (
    <>
      <div className={Details_ls.DetailsBox}>
        <div className={Details_ls.DetailsBox_center}>
          <div className={Details_ls.titleBox}>
            <Link
              to={{ pathname: '/', state: '' }}
              className={Details_ls.gohome}
            >
              Chain List
            </Link>{' '}
            / Need Deployment
          </div>
          <p className={Details_ls.titleBasic}>Basic Information</p>
          <div className={Details_ls.textBox}>
            <div className={Details_ls.textBox_name}>
              <p>id:</p>
              <p>Chains:</p>
              <p>Address:</p>
              <p>Time:</p>
              <p>Price:</p>
              <p>Volume:</p>
            </div>
            <div className={Details_ls.textBox_text}>
              <p>{value.id}</p>
              <p>
                <span></span>
                {value.chains}
              </p>
              <p>{value.address}</p>
              <p>{value.time}</p>
              <p>{value.price}</p>
              <p>{value.volume}</p>
            </div>
          </div>
          <div className={Details_ls.textBox_data}>
            <div className={Details_ls.textBox_data_titlebox}>
              <span className={Details_ls.textBox_data_titleboxtips}>Tips</span>
              <div>
                Genesis, available for download; Your subchain has been created
                successfully. To start the chain, you need to download the
                automatic deployment script file and run it on your own server
                before filling in Json-RPC. Eg: http://wwwdgfdgfggfs.com or
                http://192.168.1.1:8118; Then fill in Docker URL Name.
              </div>
            </div>
            <div className={Details_ls.textBox_data_informationbox}>
              <div className={Details_ls.textBox_data_informationbox_h1}>
                <span
                  className={Details_ls.textBox_data_informationbox_h1_span}
                >
                  Automatic Deployment Script
                </span>
                <div className={Details_ls.download}>
                  <span>
                    <DownloadOutlined />
                  </span>
                  <span>Download</span>
                </div>
                <div className={Details_ls.copy}>
                  <span>
                    <CopyOutlined />
                  </span>
                  <span>Copy</span>
                </div>
              </div>
              <div className={Details_ls.textBox_data_informationbox_h2}>
                <span
                  className={Details_ls.textBox_data_informationbox_h2_span}
                >
                  Genesis
                  {see == 0 ? (
                    <Popover
                      className={Details_ls.textBox_data_informationbox_h2_see}
                      content={content}
                      onClick={seeonclick.bind(this, 1)}
                    >
                      <EyeOutlined />
                    </Popover>
                  ) : (
                    <Popover
                      className={Details_ls.textBox_data_informationbox_h2_see}
                      content={content}
                      onClick={seeonclick.bind(this, 0)}
                    >
                      <EyeInvisibleOutlined />
                    </Popover>
                  )}
                </span>
                <div className={Details_ls.download}>
                  <span>
                    <DownloadOutlined />
                  </span>
                  <span>Download</span>
                </div>
              </div>
              {/* json */}
              {see == 0 ? '' : <div></div>}

              <div className={Details_ls.textBox_data_informationbox_h3}>
                <div className={Details_ls.textBox_data_informationbox_h3_name}>
                  Official Site
                </div>
                <div className={Details_ls.textBox_data_informationbox_h3_data}>
                  eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118
                </div>
              </div>
              <div className={Details_ls.textBox_data_informationbox_h3}>
                <div className={Details_ls.textBox_data_informationbox_h3_name}>
                  Jason-RPC
                </div>
                <div className={Details_ls.textBox_data_informationbox_h3_data}>
                  eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118
                </div>
              </div>
              <div className={Details_ls.textBox_data_informationbox_h3}>
                <div className={Details_ls.textBox_data_informationbox_h3_name}>
                  Docker URL Name
                </div>
                <div className={Details_ls.textBox_data_informationbox_h3_data}>
                  Please Enter
                </div>
              </div>
              <div className={Details_ls.button}>Confirm</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
