import Details_ls from './Details.less';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import {
  DownloadOutlined,
  CopyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  FormOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Popover, Modal } from 'antd';
export default function Details(props) {
  const [see, setSee] = useState(1);
  const [bj, setBj] = useState(0);
  const [bj2, setBj2] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [judge, setJudge] = useState(0);
  const [judgetext, setJudgetext] = useState('');
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let metadata = [
    {
      confg: {},
      chainld: 51893,
      homesteadBlock: 0,
      elp150Block: 0,
      gasUsed: 'Ox0',
      parentHash: '0x00000000000000000000000000000000000000000000',
    },
    {
      confg: {},
      chainld: 51893,
      homesteadBlock: 0,
      elp150Block: 0,
      gasUsed: 'Ox0',
      parentHash: '0x00000000000000000000000000000000000000000000',
    },
    {
      confg: {
        chainld: 51893,
      },
    },
  ];
  function seeonclick(data) {
    setSee(data);
  }
  const content = <div className={Details_ls.content}>More Information</div>;
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
  //提交按钮
  function Confirm1() {
    console.log(document.getElementById('Needinput1').value);
    console.log(document.getElementById('Needinput2').value);
    console.log(document.getElementById('Needinput3').value);
    setJudgetext('Deploy Successfully');
    setIsModalOpen(true);
  }
  //Running提交按钮
  function Confirm2() {
    // console.log(document.getElementById('Runninginput1' || '').value);
    // console.log(document.getElementById('Runninginput2' || '').value);
    setJudgetext('Change Successfully');
    setIsModalOpen(true);
  }
  //Starting提交按钮
  function Confirm3() {
    // if (document.getElementById('Startinginput1').value != null) {
    //   console.log(document.getElementById('Startinginput1').value);
    // }
    // if (document.getElementById('Startinginput2').value != null) {
    //   console.log(document.getElementById('Startinginput2').value);
    // }
    setJudgetext('Start Successfully');
    setIsModalOpen(true);
  }
  return (
    <div id="details">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        footer={null}
        header={null}
      >
        <span className={Details_ls.tstk}>
          {judge == 0 ? <CheckCircleFilled /> : <ExclamationCircleFilled />}
        </span>
        <p>{judgetext}</p>
        <Link
          to={{ pathname: '/', state: '' }}
          className={Details_ls.tstkbutton}
        >
          Back
        </Link>
      </Modal>
      <div className={Details_ls.DetailsBox}>
        <div className={Details_ls.DetailsBox_center}>
          <div className={Details_ls.titleBox}>
            <Link
              to={{ pathname: '/', state: '' }}
              className={Details_ls.gohome}
            >
              Chain List
            </Link>{' '}
            /{' '}
            {props.location.state == 1 || props.location.state == 4
              ? 'Need Deployment'
              : props.location.state == 2
              ? ' Need Starting'
              : ' Running'}
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
              {see != 0 ? (
                ''
              ) : (
                <div className={Details_ls.databox}>
                  <div>
                    <pre>
                      <code style={{ color: '#000000' }}>
                        {JSON.stringify(metadata, null, ' ')}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
              {props.location.state == 4 ? (
                <>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Official Site
                    </div>
                    <div
                      className={
                        Details_ls.textBox_data_informationbox_h3_data4
                      }
                    >
                      Need Deployment
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Json-RPC
                    </div>
                    <div
                      className={
                        Details_ls.textBox_data_informationbox_h3_data4
                      }
                    >
                      Need Deployment
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Docker URL Name
                    </div>
                    <div
                      className={
                        Details_ls.textBox_data_informationbox_h3_data4
                      }
                    >
                      Need Deployment
                    </div>
                  </div>
                  <Link
                    to={{ pathname: '/', state: '' }}
                    className={Details_ls.button}
                  >
                    Back
                  </Link>
                </>
              ) : props.location.state == 1 ? (
                <>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Official Site
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      <input
                        className={
                          Details_ls.textBox_data_informationbox_h3_data_input
                        }
                        id="Needinput1"
                        placeholder="eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Json-RPC
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      <input
                        className={
                          Details_ls.textBox_data_informationbox_h3_data_input
                        }
                        id="Needinput2"
                        placeholder="eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Docker URL Name
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      <input
                        className={
                          Details_ls.textBox_data_informationbox_h3_data_input
                        }
                        id="Needinput3"
                        placeholder="Please Enter"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div
                    className={Details_ls.button}
                    style={{ backgroundColor: '#BC76E7' }}
                    onClick={Confirm1}
                  >
                    Confirm
                  </div>
                </>
              ) : props.location.state == 3 ? (
                <>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Official Site
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      {bj == 0 ? (
                        <>
                          http://wwwdgfdgfggfs.com
                          <span
                            onClick={() => {
                              setBj(1);
                            }}
                          >
                            <FormOutlined />
                          </span>
                        </>
                      ) : (
                        <input
                          className={
                            Details_ls.textBox_data_informationbox_h3_data_input
                          }
                          id="Runninginput1"
                          placeholder="eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118"
                          autocomplete="off"
                        />
                      )}
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Json-RPC
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      {bj2 == 0 ? (
                        <>
                          http://wwwdgfdgfggfs.com
                          <span
                            onClick={() => {
                              setBj2(1);
                            }}
                          >
                            <FormOutlined />
                          </span>
                        </>
                      ) : (
                        <input
                          className={
                            Details_ls.textBox_data_informationbox_h3_data_input
                          }
                          id="Runninginput2"
                          placeholder="eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118"
                          autocomplete="off"
                        />
                      )}
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Docker URL Name
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      Please Enter
                    </div>
                  </div>
                  <div
                    className={Details_ls.button}
                    style={{
                      backgroundColor:
                        bj == 1 || bj2 == 1 ? '#9322D9' : '#BC76E7',
                    }}
                    onClick={Confirm2}
                  >
                    Confirm
                  </div>
                </>
              ) : props.location.state == 5 ? (
                <>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Official Site
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      http://wwwdgfdgfggfs.com
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Json-RPC
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      http://wwwdgfdgfggfs.com
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Docker URL Name
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      Please Enter
                    </div>
                  </div>
                  <Link
                    to={{ pathname: '/', state: '' }}
                    className={Details_ls.button}
                  >
                    Back
                  </Link>
                </>
              ) : (
                <>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Official Site
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      {bj == 0 ? (
                        <>
                          http://wwwdgfdgfggfs.com
                          <span
                            onClick={() => {
                              setBj(1);
                            }}
                          >
                            <FormOutlined />
                          </span>
                        </>
                      ) : (
                        <input
                          className={
                            Details_ls.textBox_data_informationbox_h3_data_input
                          }
                          id="Startinginput1"
                          placeholder="eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118"
                          autocomplete="off"
                        />
                      )}
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Json-RPC
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      {bj2 == 0 ? (
                        <>
                          http://wwwdgfdgfggfs.com
                          <span
                            onClick={() => {
                              setBj2(1);
                            }}
                          >
                            <FormOutlined />
                          </span>
                        </>
                      ) : (
                        <input
                          className={
                            Details_ls.textBox_data_informationbox_h3_data_input
                          }
                          id="Startinginput2"
                          placeholder="eg: http://wwwdgfdgfggfs.com or http://192.168.1.1:8118"
                          autocomplete="off"
                        />
                      )}
                    </div>
                  </div>
                  <div className={Details_ls.textBox_data_informationbox_h3}>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_name}
                    >
                      Docker URL Name
                    </div>
                    <div
                      className={Details_ls.textBox_data_informationbox_h3_data}
                    >
                      Please Enter
                    </div>
                  </div>
                  <div
                    className={Details_ls.button}
                    style={{
                      backgroundColor:
                        bj == 1 || bj2 == 1 ? '#9322D9' : '#BC76E7',
                    }}
                    onClick={Confirm3}
                  >
                    Confirm
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
