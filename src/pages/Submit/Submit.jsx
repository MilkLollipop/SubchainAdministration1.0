import Submit_ls from './Submit.less';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { ethers, BigNumber, utils } from 'ethers';
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
  create,
  update,
  comparison,
} from '../../api/request_data/overall_request';
import { message, Upload, Select, Space, Button, Modal, Spin } from 'antd';
import useWallet from '@/hook/Wallet';
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
  const [messageApi, contextHolder] = message.useMessage();
  const [nodecd, setNodecd] = useState(4);
  const [loading, setLoading] = useState(false);
  //图片路径
  const [imageUrl, setImageUrl] = useState();
  // const [imagebig, setImagebig] = useState();
  const [imageUrlff, setImageUrlff] = useState();
  const [jsonUrlff, setJsonUrlff] = useState();
  //文件代码
  const [documentdata, setDocumentdata] = useState({});
  //spin
  const [spindata, setSpindata] = useState(0);
  //结果
  const [resultdata, setResultdata] = useState(0);
  //文本框内容
  const [textblockdata, setTextblockdata] = useState('');
  const [judgetext, setJudgetext] = useState({
    a: 'Created Successfully ',
    b: 'you can view and manage your chain in homepage',
  });
  const {
    connectWallet,
    connect,
    disconnect,
    signer,
    address,
    net,
    provider,
    showSelectWallet,
    setShowSelectWallet,
  } = useWallet();
  const handleChangeselect = (value) => {
    setShei(value);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //上传图片
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append('upload', file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size < 1024;
    if (!isLt2M) {
      message.error('Image must smaller than 1kb!');
    }
    console.log(isJpgOrPng);
    console.log(isLt2M);
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    console.log(info);
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
    } else if (info.file.status === 'error') {
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
    onChange(info) {
      console.log(info);
      setmyJzicon(1);
      setmyJzicon(0);
      setJzicon(1);
      setWjtype(info.file.name);
      setUpload(1);
      console.log(info.file.name);
      console.log(
        info.file.name.substr(info.file.name.length - 4, 4).toLocaleLowerCase(),
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
    },
  };
  //上传文件
  const beforeUpload2 = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (result) => {
      let targetNum = result.target.result;
      setDocumentdata(JSON.parse(targetNum));
    };
    const formData = new FormData();
    formData.append('file', file);
    return true;
  };
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
              placeholder="金额输入必须＞700ERB"
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
    document.getElementById(`address${data}`).value = '';
    document.getElementById(`alloc${data}`).value = '';
    document.getElementById(`validator${data}`).value = '';
    document.getElementById(`stake${data}`).value = '';
  }
  //删除
  function deleteoutlinedonclick(data) {
    document.getElementById(data).style.display = 'none';
    setNodecd(nodecd - 1);
  }
  let zdata = {
    name: '',
    symbol: '',
    user: localStorage.getItem('user_addr'),
    icon: '',
    offical_site: '',
    alloc_and_stakes: [],
    create_time: new Date().getTime(),
    status: 0,
    price: 0,
    volume: 0,
  };
  //wormholessubmit提交按钮
  function wormholessubmit() {
    // console.log(window);
    // console.log(window.outerHeight + window.pageYOffset);
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
      imageUrl != undefined &&
      a + aa + aaa < 1;
    // zdata.alloc_and_stakes.slice(0, zdata.alloc_and_stakes.length);
    if (localStorage.getItem('Account_Balance') > 0) {
      if (pd) {
        console.log(pd);
        setSpindata(1);
        zdata.name = document.getElementById('name').value;
        zdata.symbol = document.getElementById('symbol').value;
        zdata.icon = imageUrl;
        zdata.offical_site = document.getElementById('official').value;
        for (let i = 0; i < b.length; i++) {
          zdata.alloc_and_stakes.push(b[i]);
        }
        zdata.genesis = {
          config: {
            homesteadBlock: 0,
            eip150Block: 0,
            eip155Block: 0,
            eip158Block: 0,
            byzantiumBlock: 0,
            constantinopleBlock: 0,
            petersburgBlock: 0,
            istanbulBlock: 0,
            berlinBlock: 0,
            londonBlock: 0,
            istanbul: {
              epoch: 30000,
              policy: 0,
              ceil2Nby3Block: 0,
            },
            isQuorum: true,
          },
          nonce: '0x0',
          extraData:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          gasLimit: '3758096384',
          difficulty: '0x1',
          alloc: {},
          stake: {},
          validator: {},
          coinbase: '0x0000000000000000000000000000000000000000',
          mixHash:
            '0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365',
          parentHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          timestamp: '0',
          dir: '',
          inject_number: 4096,
          start_index: 0,
          royalty: 1000,
          creator: '0x0000000000000000000000000000000000000000',
        };
        zdata.alloc_and_stakes.map((item) => {
          zdata.genesis.alloc[item.addr] = {
            balance: item.alloc,
          };
          item.exchanger
            ? (zdata.genesis.stake[item.addr] = {
                balance: item.exchanger,
              })
            : '';
          zdata.genesis.validator[item.addr] = {
            balance: item.validator,
          };
        });
        delete zdata.alloc_and_stakes;
        console.log(zdata);
        console.log(signer);
        console.log(comparison(chainiddb));
        comparison(chainiddb);

        create().then((item) => {
          console.log(item);
          try {
            signer.sendTransaction(item).then((data) => {
              console.log(data);
              data.wait().then((tx) => {
                console.log(tx);
                console.log(BigNumber.from(tx.logs[0].topics[1]).toNumber());
                let id = BigNumber.from(tx.logs[0].topics[1]).toNumber();
                zdata.genesis.config.chainId = id;
                update(id, zdata).then((item) => {
                  signer.sendTransaction(item).then((data) => {
                    if (data) {
                      setResultdata(1);
                    } else {
                      setResultdata(2);
                    }
                  });
                });
              });
            });
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        messageApi.open({
          type: 'error',
          content: 'Required items are blank or entered incorrectly',
        });
      }
    } else {
      messageApi.open({
        type: 'error',
        content: 'Insufficient account balance',
      });
    }
  }
  const chainiddb = async () => {
    return await signer.getChainId();
  };
  function isJSON(str) {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  let zdata2 = {
    name: '',
    symbol: '',
    user: localStorage.getItem('user_addr'),
    icon: '',
    offical_site: '',
    create_time: new Date().getTime(),
    status: 0,
    price: 0,
    volume: 0,
  };
  let zdata3 = {
    name: '',
    symbol: '',
    user: localStorage.getItem('user_addr'),
    icon: '',
    offical_site: '',
    create_time: new Date().getTime(),
    status: 0,
    price: 0,
    volume: 0,
  };
  useEffect(() => {
    if (resultdata == 1) {
      setSpindata(0);
      setJudge(0);
      setJudgetext({
        a: 'Created Successfully',
        b: 'you can view and manage your chain in homepage',
      });
      setIsModalOpen(true);
    } else if (resultdata == 2) {
      setSpindata(0);
      setJudge(1);
      setJudgetext({
        a: 'Fail to Created',
        b: 'Caused by internet or some unknown problems',
      });
      setIsModalOpen(true);
    }
  }, [resultdata]);
  function mycodeonclick() {
    // setJudgetext({
    //   a: 'Created Successfully ',
    //   b: 'you can view and manage your chain in homepage',
    // });
    // setIsModalOpen(true);

    if (code == 0) {
      zdata2.genesis = {
        config: {
          homesteadBlock: 0,
          eip150Block: 0,
          eip155Block: 0,
          eip158Block: 0,
          byzantiumBlock: 0,
          constantinopleBlock: 0,
          petersburgBlock: 0,
          // istanbulBlock: 0,
          berlinBlock: 0,
          londonBlock: 0,
          istanbul: {
            epoch: 30000,
            policy: 0,
            ceil2Nby3Block: 0,
          },
          isQuorum: true,
        },
        nonce: '0x0',
        extraData:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        gasLimit: '3758096384',
        difficulty: '0x1',
        alloc: {},
        // stake: {},
        // validator: {},
        coinbase: '0x0000000000000000000000000000000000000000',
        mixHash:
          '0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365',
        parentHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        // timestamp: '0',
        // dir: '',
        // inject_number: 4096,
        // start_index: 0,
        // royalty: 1000,
        // creator: '0x0000000000000000000000000000000000000000',
      };
      let pd =
        document.getElementById('name').value != '' &&
        document.getElementById('symbol').value != '' &&
        imageUrl != undefined &&
        document.getElementById('textareadata').value != '' &&
        isJSON(document.getElementById('textareadata').value) == true;
      console.log(document.getElementById('textareadata').value != '');
      if (localStorage.getItem('Account_Balance') > 0) {
        if (pd) {
          setSpindata(1);
          zdata2.name = document.getElementById('name').value;
          zdata2.symbol = document.getElementById('symbol').value;
          zdata2.icon = imageUrl;
          zdata2.offical_site = document.getElementById('official').value;
          console.log(
            JSON.parse(document.getElementById('textareadata').value),
          );
          zdata2.genesis.alloc = JSON.parse(
            document.getElementById('textareadata').value,
          );
          console.log(zdata2);
          comparison(chainiddb);
          create().then((item) => {
            signer.sendTransaction(item).then((data) => {
              console.log(data);
              data.wait().then((tx) => {
                console.log(tx);
                console.log(BigNumber.from(tx.logs[0].topics[1]).toNumber());
                let id = BigNumber.from(tx.logs[0].topics[1]).toNumber();
                zdata2.genesis.config.chainId = id;
                update(id, zdata2).then((item) => {
                  signer.sendTransaction(item).then((data) => {
                    if (data) {
                      setResultdata(1);
                    } else {
                      setResultdata(2);
                    }
                  });
                });
              });
            });
          });
        } else {
          messageApi.open({
            type: 'error',
            content: 'Required items are blank or entered incorrectly',
          });
        }
      } else {
        messageApi.open({
          type: 'error',
          content: 'Insufficient account balance',
        });
      }
    } else {
      zdata3.genesis = {
        config: {
          homesteadBlock: 0,
          eip150Block: 0,
          eip155Block: 0,
          eip158Block: 0,
          byzantiumBlock: 0,
          constantinopleBlock: 0,
          petersburgBlock: 0,
          // istanbulBlock: 0,
          berlinBlock: 0,
          londonBlock: 0,
          istanbul: {
            epoch: 30000,
            policy: 0,
            ceil2Nby3Block: 0,
          },
          isQuorum: true,
        },
        nonce: '0x0',
        extraData:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        gasLimit: '3758096384',
        difficulty: '0x1',
        alloc: {},
        // stake: {},
        // validator: {},
        coinbase: '0x0000000000000000000000000000000000000000',
        mixHash:
          '0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365',
        parentHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        // timestamp: '0',
        // dir: '',
        // inject_number: 4096,
        // start_index: 0,
        // royalty: 1000,
        // creator: '0x0000000000000000000000000000000000000000',
      };
      let pd =
        document.getElementById('name').value != '' &&
        document.getElementById('symbol').value != '' &&
        imageUrl != undefined &&
        documentdata != undefined;
      if (localStorage.getItem('Account_Balance') > 0) {
        if (pd) {
          zdata3.name = document.getElementById('name').value;
          zdata3.symbol = document.getElementById('symbol').value;
          zdata3.icon = imageUrl;
          zdata3.offical_site = document.getElementById('official').value;
          zdata3.genesis.alloc = documentdata;
          console.log(documentdata);
          console.log(zdata3);
          comparison(chainiddb);
          create().then((item) => {
            signer.sendTransaction(item).then((data) => {
              console.log(data);
              data.wait().then((tx) => {
                if (tx.logs.length > 0) {
                  console.log(tx);
                  console.log(BigNumber.from(tx.logs[0].topics[1]).toNumber());
                  let id = BigNumber.from(tx.logs[0].topics[1]).toNumber();
                  zdata3.genesis.config.chainId = id;
                  update(id, zdata3).then((item) => {
                    signer.sendTransaction(item).then((data) => {
                      if (data) {
                        setResultdata(1);
                      } else {
                        setResultdata(2);
                      }
                    });
                  });
                } else {
                }
              });
            });
          });
        } else {
          messageApi.open({
            type: 'error',
            content: 'Required items are blank or entered incorrectly',
          });
        }
      } else {
        messageApi.open({
          type: 'error',
          content: 'Insufficient account balance',
        });
      }
    }
  }
  return (
    <>
      {contextHolder}
      <div id="submit">
        {spindata == 1 ? (
          <Spin
            size="large"
            className={Submit_ls.spin}
            style={{ height: `${window.outerHeight + window.pageYOffset}px` }}
          />
        ) : (
          ''
        )}
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
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  <p>
                    Recommanded resolution is 64*64 with file size less than
                    1kb, keep visual elements centered
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
                  <div className={Submit_ls.tablebox_headerbox_h2}>
                    Operation
                  </div>
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
                      // setTextblockdata(
                      //   document.getElementById('textareadata').value,
                      // );
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
                      setTextblockdata(
                        document.getElementById('textareadata').value,
                      );
                      setCode(1);
                      console.log(
                        document.getElementById('textareadata').value,
                      );
                    }}
                  >
                    Upload Code
                  </div>
                </div>
                {code == 0 ? (
                  <div className={Submit_ls.mytablebox_dhtitlebox_table}>
                    <textarea
                      spellcheck="false"
                      id="textareadata"
                      placeholder="Tips：The code must includes the information of Address ,Balance_Alloc,Balance_Validator;Make sure your code is in the right format so that the chain can be created successfully."
                      // value={textblockdata}
                    >
                      {textblockdata}
                    </textarea>
                    <p>*Only Support JSON Format</p>
                  </div>
                ) : (
                  <>
                    <div className={Submit_ls.Uploadmywj} id="mywj">
                      {upload == 0 ? (
                        <Upload {...myprops} beforeUpload={beforeUpload2}>
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
                                color:
                                  uploadformat == 0 ? '#F7BF03' : '#C6C6C6',
                              }}
                            >
                              <FileTextOutlined />
                            </span>
                            <span
                              className={Submit_ls.Uploadmywj_block2_wjtype}
                            >
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
                              className={
                                Submit_ls.Uploadmywj_block2_wjtype_span2
                              }
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
                      style={{
                        color: uploadformat == 0 ? '#A9A9A9' : '#FF2B2B',
                      }}
                    >
                      *Only Support JSON Format
                    </p>
                  </>
                )}
                <div
                  className={Submit_ls.myfilltablebox_zhulianbutton}
                  onClick={mycodeonclick}
                >
                  Submit
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
