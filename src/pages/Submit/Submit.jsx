import Submit_ls from './Submit.less';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import {
  PlusOutlined,
  LoadingOutlined,
  ClearOutlined,
  DeleteOutlined,
  UploadOutlined,
  FileTextOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import {
  Subchainicon,
  establish1,
} from '../../api/request_data/overall_request';
import { message, Upload, Select, Space, Button, Modal } from 'antd';
export default function Submit() {
  const [shei, setShei] = useState(1);
  const [code, setCode] = useState(0);
  const [jzicon, setJzicon] = useState(0);
  const [judge, setJudge] = useState(0);
  const [myjzicon, setmyJzicon] = useState(0);
  const [wjtype, setWjtype] = useState('');
  const [tablexh, setTablexh] = useState([1, 2, 3, 4]);
  const [upload, setUpload] = useState(0);
  const [uploadformat, setUploadformat] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodecd, setNodecd] = useState(4);
  const [loading, setLoading] = useState(false);
  //图片路径
  const [imageUrl, setImageUrl] = useState();
  const [imageUrlff, setImageUrlff] = useState();
  const [judgetext, setJudgetext] = useState({
    a: 'Created Successfully ',
    b: 'you can view and manage your chain in homepage',
  });
  let zdata = {
    name: '',
    symbol: '',
    user: localStorage.getItem('user_addr'),
    icon_path: '',
    officical_site: '',
    alloc_and_stakes: [],
    alloc_len: '',
  };
  const handleChangeselect = (value) => {
    setShei(value);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // icon上传
  const Subchainicon_q = async (item) => {
    const data = await Subchainicon(item);
    console.log('icon返回');
    console.log(data);
    if (data) {
      setImageUrlff(data.data);
    }
  };
  //创建子链1
  const establish1_q = async (item) => {
    const data = await establish1(item);
    console.log('创建子链1');
    console.log(data);
  };
  const formData = new FormData();
  //上传图片
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    console.log(file);
    formData.append('upload', file);
    Subchainicon_q(formData);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  //添加node
  function nodeadd() {
    setNodecd(nodecd + 1);
    let data = [];
    for (let i = 0; i < tablexh.length; i++) {
      data.push(tablexh[i]);
    }
    data.push(data[data.length - 1] + 1);
    setTablexh(data);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  //上传图片
  //上传文件
  const myprops = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      setmyJzicon(1);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setmyJzicon(0);
        setJzicon(1);
        setWjtype(info.file.name);
        setUpload(1);
        console.log(info.file.name);
        console.log(
          info.file.name
            .substr(info.file.name.length - 4, 4)
            .toLocaleLowerCase(),
        );
        if (
          info.file.name
            .substr(info.file.name.length - 4, 4)
            .toLocaleLowerCase() == 'json'
        ) {
          setUploadformat(0);
        } else {
          setUploadformat(1);
        }
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };
  //上传文件
  //表格循环
  function tableloop() {
    return tablexh.map((item) => {
      return (
        <div className={Submit_ls.tableh} id={item}>
          <div className={Submit_ls.tableh_block1}>
            <span>*</span>
            <input
              class="tableh_block_input1"
              placeholder="例：ex 0X01234…01234"
              autocomplete="off"
              id={`address${item}`}
            />
          </div>
          <div className={Submit_ls.tableh_block1}>
            <span>*</span>
            <input
              class="tableh_block_input2"
              placeholder="金额推荐为默认值，可更改"
              autocomplete="off"
              id={`alloc${item}`}
            />
          </div>
          <div className={Submit_ls.tableh_block1}>
            <span>*</span>
            <input
              class="tableh_block_input3"
              placeholder="金额输入必须＞70000ERB"
              autocomplete="off"
              id={`validator${item}`}
            />
          </div>
          <div className={Submit_ls.tableh_block2}>
            <input
              class="tableh_block_input4"
              placeholder="金额输入必须＞70000ERB"
              autocomplete="off"
              id={`stake${item}`}
            />
          </div>
          <div className={Submit_ls.tableh_block3}>
            <span
              className={Submit_ls.tableh_block3_icon1}
              onClick={clearoutlinedonclick.bind(this, item)}
            >
              <ClearOutlined />
            </span>
            {nodecd > 4 ? (
              <span
                className={Submit_ls.tableh_block3_icon2}
                onClick={deleteoutlinedonclick.bind(this, item)}
              >
                <DeleteOutlined />
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    });
  }
  //清除
  function clearoutlinedonclick(data) {
    console.log(data);
  }
  //删除
  function deleteoutlinedonclick(data) {
    console.log(data);
    document.getElementById(data).style.display = 'none';
    setNodecd(nodecd - 1);
  }
  //wormholessubmit提交按钮
  function wormholessubmit() {
    // setJudgetext({
    //   a: 'Created Successfully ',
    //   b: 'you can view and manage your chain in homepage',
    // });
    // setIsModalOpen(true);
    let a = 0;
    let aa = 0;
    let aaa = 0;
    let b = [];
    for (
      let i = 0;
      i < document.getElementsByClassName('tableh_block_input1').length;
      i++
    ) {
      if (
        document.getElementsByClassName('tableh_block_input1')[i].value == ''
      ) {
        a++;
      }
      b.push({
        addr: document.getElementsByClassName('tableh_block_input1')[i].value,
      });
    }
    for (
      let i = 0;
      i < document.getElementsByClassName('tableh_block_input2').length;
      i++
    ) {
      if (
        document.getElementsByClassName('tableh_block_input2')[i].value == ''
      ) {
        aa++;
      }
      b[i].alloc = document.getElementsByClassName('tableh_block_input2')[
        i
      ].value;
    }
    for (
      let i = 0;
      i < document.getElementsByClassName('tableh_block_input3').length;
      i++
    ) {
      if (
        document.getElementsByClassName('tableh_block_input3')[i].value == ''
      ) {
        aaa++;
      }
      b[i].validator = document.getElementsByClassName('tableh_block_input3')[
        i
      ].value;
    }
    for (
      let i = 0;
      i < document.getElementsByClassName('tableh_block_input4').length;
      i++
    ) {
      b[i].exchanger = document.getElementsByClassName('tableh_block_input4')[
        i
      ].value;
    }
    let pd =
      document.getElementById('name').value != '' &&
      document.getElementById('symbol').value != '' &&
      imageUrlff != undefined &&
      a + aa + aaa < 1;
    zdata.alloc_and_stakes.slice(0, zdata.alloc_and_stakes.length);
    if (pd) {
      zdata.name = document.getElementById('name').value;
      zdata.symbol = document.getElementById('symbol').value;
      zdata.icon_path = imageUrlff;
      zdata.officical_site = document.getElementById('official').value;
      for (let i = 0; i < b.length; i++) {
        zdata.alloc_and_stakes.push(b[i]);
      }
      zdata.alloc_len = zdata.alloc_and_stakes.length;
      console.log(zdata);
      establish1_q(zdata);
    }
  }
  return (
    <div id="submit">
      <Modal
        open={isModalOpen}
        closable={true}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        header={null}
      >
        <span className={Submit_ls.tstk}>
          {judge == 0 ? <CheckCircleFilled /> : <ExclamationCircleFilled />}
        </span>
        <p>{judgetext.a}</p>
        <p>{judgetext.b}</p>
        <Link
          to={{ pathname: '/', state: '' }}
          className={Submit_ls.tstkbutton}
        >
          Back
        </Link>
      </Modal>
      <div className={Submit_ls.SubmitBox}>
        <div className={Submit_ls.centerbox}>
          <div className={Submit_ls.titlebox}>Submit</div>
          <div className={Submit_ls.titledatabox}>
            <div className={Submit_ls.titledatabox_block}>
              <div className={Submit_ls.titledatabox_block_name}>
                <span>*</span>
                Name
              </div>
              <input
                className={Submit_ls.titledatabox_block_text}
                placeholder="Please enter a name"
                autocomplete="off"
                id="name"
              />
            </div>
            <div className={Submit_ls.titledatabox_block}>
              <div className={Submit_ls.titledatabox_block_name}>
                <span>*</span>
                Symbol
              </div>
              <input
                className={Submit_ls.titledatabox_block_text}
                placeholder="Please enter a name"
                autocomplete="off"
                id="symbol"
              />
            </div>
            <div className={Submit_ls.titledatabox_block}>
              <div className={Submit_ls.titledatabox_block_name}>
                <span>*</span>
                img
              </div>
              <div className={Submit_ls.titledatabox_block_imgbox}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                <p>
                  Recommanded resolution is 640*640 with file size less than
                  2MB, keep visual elements centered
                </p>
              </div>
            </div>
            <div className={Submit_ls.titledatabox_block}>
              <div className={Submit_ls.titledatabox_block_name}>
                Official Site
              </div>
              <input
                style={{ width: '221px' }}
                className={Submit_ls.titledatabox_block_text}
                placeholder="Please enter a name"
                autocomplete="off"
                id="official"
              />
            </div>
          </div>
          <div className={Submit_ls.nodebox} id="node">
            <span className={Submit_ls.nodebox_span}>Node</span>
            <Space wrap>
              <Select
                defaultValue="Use Wormholes ChainChain"
                style={
                  {
                    // width: 212,
                  }
                }
                onChange={handleChangeselect}
                options={[
                  {
                    value: '1',
                    label: 'Use Wormholes ChainChain',
                  },
                  {
                    value: '2',
                    label: 'Use EVM Chain',
                  },
                ]}
              />
            </Space>
            <span className={Submit_ls.nodebox_div}>
              {shei == 1
                ? 'Tips:You need to initiate at least 4 nodes.You can add more nodes.'
                : 'Fill in or upload the code online, please ensure the standard & availability & accuracy of the code; Necessary parameters include: account address, initial asset allocation, and default miner allocation are written according to the code specification of the Wormholes main chain; 4 groups of fields need to be written or submitted according to the EVM Ethereum specification; Be sure to ensure its normalization, accuracy and availability'}
            </span>
          </div>
          {shei == 1 ? (
            <div className={Submit_ls.tablebox}>
              <div className={Submit_ls.tablebox_headerbox}>
                <div className={Submit_ls.tablebox_headerbox_h1}>Address</div>
                <div className={Submit_ls.tablebox_headerbox_h1}>
                  Balance_Alloc
                </div>
                <div className={Submit_ls.tablebox_headerbox_h1}>
                  Balance_Validator
                </div>
                <div className={Submit_ls.tablebox_headerbox_h1}>
                  Balance_Stake
                </div>
                <div className={Submit_ls.tablebox_headerbox_h2}>Operation</div>
              </div>
              {tableloop()}
              <div className={Submit_ls.tablebox_add} onClick={nodeadd}>
                + Add
              </div>
              <div
                className={Submit_ls.tablebox_zhulianbutton}
                onClick={wormholessubmit}
              >
                Submit
              </div>
            </div>
          ) : (
            <div className={Submit_ls.mytablebox}>
              <div className={Submit_ls.mytablebox_dhtitlebox}>
                <div
                  className={
                    code == 0
                      ? Submit_ls.mytablebox_dhtitlebox_fill1
                      : Submit_ls.mytablebox_dhtitlebox_fill2
                  }
                  onClick={() => {
                    setCode(0);
                  }}
                >
                  Fill in Code
                </div>
                <div
                  className={
                    code == 1
                      ? Submit_ls.mytablebox_dhtitlebox_fill1
                      : Submit_ls.mytablebox_dhtitlebox_fill2
                  }
                  onClick={() => {
                    setCode(1);
                  }}
                >
                  Upload Code
                </div>
              </div>
              {code == 0 ? (
                <div className={Submit_ls.mytablebox_dhtitlebox_table}>
                  <textarea placeholder="Tips：The code must includes the information of Address ,Balance_Alloc,Balance_Validator;Make sure your code is in the right format so that the chain can be created successfully." />
                  <p>*Only Support JSON Format</p>
                </div>
              ) : (
                <>
                  <div className={Submit_ls.Uploadmywj} id="mywj">
                    {upload == 0 ? (
                      <Upload {...myprops}>
                        <Button
                          className={Submit_ls.Uploadmywj_b}
                          icon={<UploadOutlined />}
                        >
                          Upload Code
                        </Button>
                      </Upload>
                    ) : (
                      ''
                    )}

                    {myjzicon == 1 ? (
                      <div className={Submit_ls.Uploadmywj_block}>
                        <LoadingOutlined />
                      </div>
                    ) : (
                      ''
                    )}
                    {jzicon == 1 ? (
                      <div className={Submit_ls.Uploadmywj_block2}>
                        <div className={Submit_ls.Uploadmywj_block2_div1}>
                          <span
                            className={Submit_ls.Uploadmywj_block2_icon}
                            style={{
                              color: uploadformat == 0 ? '#F7BF03' : '#C6C6C6',
                            }}
                          >
                            <FileTextOutlined />
                          </span>
                          <span className={Submit_ls.Uploadmywj_block2_wjtype}>
                            {wjtype}
                          </span>
                        </div>
                        <div className={Submit_ls.Uploadmywj_block2_div2}>
                          {uploadformat == 0 ? (
                            <span
                              className={
                                Submit_ls.Uploadmywj_block2_wjtype_span1
                              }
                            >
                              Uploaded /
                            </span>
                          ) : (
                            <span
                              className={
                                Submit_ls.Uploadmywj_block2_wjtype_span1
                              }
                              style={{ color: '#FF3535' }}
                            >
                              format error /
                            </span>
                          )}
                          &nbsp;
                          <span
                            className={Submit_ls.Uploadmywj_block2_wjtype_span2}
                            onClick={() => {
                              setUpload(0);
                              setJzicon(0);
                              setUploadformat(0);
                            }}
                          >
                            Reupload
                          </span>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <p
                    className={Submit_ls.Uploadmywj_p}
                    style={{ color: uploadformat == 0 ? '#A9A9A9' : '#FF2B2B' }}
                  >
                    *Only Support JSON Format
                  </p>
                </>
              )}
              <div
                className={Submit_ls.myfilltablebox_zhulianbutton}
                onClick={() => {
                  setJudgetext({
                    a: 'Created Successfully ',
                    b: 'you can view and manage your chain in homepage',
                  });
                  setIsModalOpen(true);
                }}
              >
                Submit
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
