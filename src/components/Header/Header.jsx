import Header_ls from './Header.less';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Popover, Modal, message } from 'antd';
import useWallet from '@/hook/Wallet';
import { ethers, Signer, utils } from 'ethers';
import { encode, decode } from 'js-base64';
import {
  CopyOutlined,
  ExportOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import indentData from '@/utils/myIdent';
import { ellipsis64 } from '../../utils/methods/Methods';
import { signMessage } from '@/hook/wallet1';
import { ToastContainer, toast } from 'react-toastify';
import PubSub from 'pubsub-js';
import copy from 'copy-to-clipboard';
import {
  adsBalance,
  Popularsubchain,
  userLogin,
  urllogin,
} from '../../api/request_data/overall_request';
const crypto = require('crypto');
export default function Header(props) {
  // console.log(JSON.parse(props.props.location.query.data));
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 账户地址
  const [accountaddress, setAccountaddress] = useState('');
  //登录状态
  const [loginstatus, setLoginstatus] = useState(false);
  const [addressblock, setAddressblock] = useState(0);
  const [smartcontractblock, setSmartcontractblock] = useState(0);
  //user_signer
  const [usersigner, setUsersigner] = useState({});
  //余额
  const [balancedata, setBalancedata] = useState({});
  //登录login
  const [signinlogin, setSigninlogin] = useState({});
  //wor  sig
  const [worsig, setWorsig] = useState('');
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const login = async (type) => {
    if (type === 'worm') {
      localStorage.setItem('WormWallet', 'true');
    } else {
      localStorage.setItem('WormWallet', 'metamask');
    }
    console.log('LOGIN', type);
    if (type === 'worm') {
      await connect(type);
    } else {
      await connect();
    }

    //TODO
    // handlerPostMessage({
    //   type: 'authLogin',
    //   data: {
    //     name: 'wallet',
    //   },
    //   callback(e) {
    //     requestUserLogin({
    //       user_addr: e.address,
    //     });
    //   },
    // });
  };
  const logOut = () => {
    setAccountaddress('');
    if (localStorage.getItem('WormWallet') != 'true') {
      disconnect();
    }

    props.props.history.push('/');

    window.myKey = null;
  };
  //余额查询
  const adsBalance_q = async (item) => {
    const data = await adsBalance(item);
    console.log('余额查询');
    console.log(data);
    if (data) {
      setBalancedata(data);
    }
  };
  //登录login
  const urllogin_q = async (item) => {
    const wallet = ethers.Wallet.createRandom();
    console.log(wallet);
    let md5Data = '';
    let result = 0;
    const data = await urllogin(item);
    console.log('登录login');
    console.log(data);
    if (data) {
      if (data.code == 0) {
        const hash = data.data.hash.toLowerCase();
        const secret = data.data.secret;
        do {
          md5Data = crypto
            .createHash('md5')
            .update(secret + result)
            .digest('hex');
          result++;
        } while (md5Data.toLowerCase() !== hash);
        const secondRequestData = {
          approve_addr: wallet.address,
          result: String(result - 1),
          time_stamp: String(data.data.timeStamp),
          user_addr: address,
        };
        let secondRequestDataSig;
        if (localStorage.getItem('whatwallet') == 'Limion') {
          secondRequestDataSig = signMessage(
            JSON.stringify(secondRequestData),
            address,
          );
        } else {
          console.log(secondRequestData);
          secondRequestDataSig = await signer.signMessage(
            JSON.stringify(secondRequestData),
          );
        }
        console.log(secondRequestDataSig);
        const formatSecondRequestData = {
          approve_addr: wallet.address,
          result: String(result - 1),
          sig: secondRequestDataSig,
          time_stamp: String(data.data.timeStamp),
          user_addr: address,
          // user_addr: '0xbc2f531de913ccd0a9c84d2b49425bbe4bb3233e',
          // approve_addr: '0x024d41cdbd1a420fF8B8dD2b8da167851b4e580e',
          // result: '9603',
          // time_stamp: '1676626885',
          // sig: '0x6f0bf4dff821c279c5ea18f762bdd73dcf879108806d07f89c534c64c65675c36c355a04638cf1c3832a5076eb60815b4bdbfbb108194ed1e7615493276cb8091b',
        };
        console.log(formatSecondRequestData);
        const datatwo = await urllogin(formatSecondRequestData);
        console.log(datatwo);
        localStorage.setItem('token', datatwo.data.token);
      }
    }
  };

  // curl  -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' 127.0.0.1:8560
  // curl
  //   - H "Content-type: application/json"
  //     - X POST--data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"0x5051B76579BC966A9480dd6E72B39A4C89c1154C","to":"0xFB7d285519A5A377e6c235ad816Ef91f82AabbEd","gas":"0x15f90","gasPrice":"0x430e23400","value":"0x9b6e64a8ec60000"}],"id":"1"}' http://43.129.181.130:8561
  //登录loginwor
  const urlloginwor_q = async (item) => {
    console.log(item);
    const wallet = ethers.Wallet.createRandom();
    localStorage.setItem('approve_addr', wallet.address);
    console.log(wallet);
    let md5Data = '';
    let result = 0;
    localStorage.setItem('privateKey', wallet.privateKey);
    item.approve_addr = wallet.address;
    const data = await urllogin(item);
    console.log('登录login');
    console.log(data);
    if (data) {
      if (data.code == 0) {
        const hash = data.data.hash.toLowerCase();
        const secret = data.data.secret;
        do {
          md5Data = crypto
            .createHash('md5')
            .update(secret + result)
            .digest('hex');
          result++;
        } while (md5Data.toLowerCase() !== hash);
        const secondRequestData = {
          approve_addr: wallet.address,
          result: String(result - 1),
          time_stamp: String(data.data.timeStamp),
          user_addr: item.user_addr,
        };
        localStorage.setItem('time_stamp', String(data.data.timeStamp));
        localStorage.setItem('result', String(result - 1));
        let secondRequestDataSig;
        console.log(secondRequestData);
        console.log(item.user_addr + '====================');
        let url = localStorage.getItem('backUrl');
        secondRequestDataSig = signMessage(
          JSON.stringify(secondRequestData),
          item.user_addr,
          url,
        );

        console.log(secondRequestDataSig);
        // const formatSecondRequestData = {
        //   user_addr: accountaddress,
        //   approve_addr: wallet.address,
        //   result: String(result - 1),
        //   time_stamp: String(data.data.timeStamp),
        //   sig: secondRequestDataSig,
        // };
        // console.log(formatSecondRequestData);
        // const datatwo = await urllogin(formatSecondRequestData);
        // console.log(datatwo);
      }
    }
  };
  const secondLoginWallet = async (sig) => {
    localStorage.removeItem('option');
    const formatSecondRequestData = {
      // user_addr: localStorage.getItem('user_addr'),
      // approve_addr: localStorage.getItem('approve_addr'),
      // result: localStorage.getItem('result'),
      // time_stamp: localStorage.getItem('time_stamp'),
      // sig: sig,
      approve_addr: localStorage.getItem('approve_addr'),
      result: localStorage.getItem('result'),
      time_stamp: localStorage.getItem('time_stamp'),
      user_addr: localStorage.getItem('user_addr'),
      sig: sig,
    };
    const secondLoginRes = await urllogin(formatSecondRequestData);
    console.log(secondLoginRes);
    localStorage.setItem('token', secondLoginRes.data.token);
    if (secondLoginRes) {
      localStorage.removeItem('approve_addr');
      localStorage.removeItem('result');
      localStorage.removeItem('time_stamp');
    }
  };
  let userLogindata = {
    user_addr: accountaddress,
    approve_addr: '',
    result: '',
    time_stamp: '',
    sig: '',
  };
  useEffect(() => {
    if (Object.keys(props.props.location.query).length != 0) {
      console.log(props.props.location);
      if (props.props.location.query.data) {
        let add = JSON.parse(props.props.location.query.data).address;
        console.log(add);
        localStorage.setItem('user_addr', add);
        setAccountaddress(add);
        let userLogindatawor = {
          user_addr: add,
          approve_addr: '',
          result: '',
          time_stamp: '',
          sig: '',
        };
        urlloginwor_q(userLogindatawor);
      }
      if (props.props.location.query.sig) {
        console.log();
        secondLoginWallet(props.props.location.query.sig);
      }
    }
    adsBalance_q(
      accountaddress != '' ? accountaddress : localStorage.getItem('user_addr'),
    );
    if (localStorage.getItem('user_addr')) {
      setAccountaddress(localStorage.getItem('user_addr'));
    }
    PubSub.subscribe('user_signer', (msg, index) => {
      setUsersigner(index);
    });
  }, []);

  useEffect(() => {
    if (accountaddress) {
      console.log(accountaddress);
      setLoginstatus(true);
      adsBalance_q(accountaddress);
      if (localStorage.getItem('whatwallet') == 'MetaMask') {
        urllogin_q(userLogindata);
      }
    }
  }, [accountaddress]);
  useEffect(() => {
    if (signer) {
      console.log(signer);
    }
  }, [signer]);
  useEffect(() => {
    PubSub.publish('Allloginstatus', loginstatus);
  }, [loginstatus]);
  useEffect(() => {}, [signinlogin]);
  // MetaMask登录
  function MetaMaskSignIn() {
    setIsModalOpen(false);
    login();
    localStorage.setItem('whatwallet', 'MetaMask');
    PubSub.subscribe('MetaMaskAddress', (msg, index) => {
      console.log(index);
      localStorage.setItem('user_addr', index);
      setAccountaddress(index);
    });
  }
  // WormWallet登录
  const WormWalletSignIn = (e) => {
    setIsModalOpen(false);
    localStorage.setItem('whatwallet', 'Limion');
    let url = location.href;
    console.log(url);
    const backUrl = encode(url);
    localStorage.setItem('backUrl', url);
    console.log('backUrl', url);
    window.open(
      `http://192.168.1.235:9006/wallet/#/connect-wallet?backUrl=${backUrl}&action=login`,
      '_self',
    );
    e.stopPropagation();
  };
  //复制
  function copyonclick(data) {
    copy(data);
    message.success('copy Success');
  }
  //退出
  function accountwithdrawal() {
    localStorage.removeItem('token');
    if (localStorage.getItem('whatwallet') == 'MetaMask') {
      logOut();
      localStorage.removeItem('whatwallet');
      localStorage.removeItem('user_addr');
      setLoginstatus(false);
    } else {
      localStorage.removeItem('whatwallet');
      localStorage.removeItem('user_addr');
      setLoginstatus(false);
      setAccountaddress('');
      props.props.history.push('/');
    }
  }
  function addressonclick() {
    if (addressblock == 0) {
      setAddressblock(1);
    } else {
      setAddressblock(0);
    }
  }
  function Smartcontractonclick() {
    if (smartcontractblock == 0) {
      setSmartcontractblock(1);
    } else {
      setSmartcontractblock(0);
    }
  }
  return (
    <div id="header">
      <Modal
        open={isModalOpen}
        closable={true}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        header={null}
      >
        <p className={Header_ls.Modaltitle}>Connect Wallet</p>
        <div className={Header_ls.Modal_namebox}>
          <div onClick={MetaMaskSignIn}>
            <img src={require('../../assets/images/Header/Slice 10.png')} />
            <span>Metamask</span>
          </div>
          <div onClick={WormWalletSignIn}>
            <img src={require('../../assets/images/Header/Slice 11.png')} />
            <span>Limino</span>
          </div>
        </div>
        <p className={Header_ls.Modaltitle_p}>
          Connecting to the wallet means you agree with Wormholes{' '}
          <span>Term of Use</span>and<span>Pravicy Policy</span>
        </p>
      </Modal>

      <div className={Header_ls.HeaderBox}>
        <div className={Header_ls.center}>
          <Link to={{ pathname: '/', state: '' }}>
            <img
              className={Header_ls.logo}
              src={require('../../assets/images/Header/Group 249.png')}
            />
          </Link>
          {loginstatus == false ? (
            <div
              className={Header_ls.Signbox}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Create Blockchain
            </div>
          ) : (
            <div className={Header_ls.loginBox}>
              <div
                className={Header_ls.loginBox_Smartcontract}
                onClick={Smartcontractonclick}
              >
                Smart contract
                {smartcontractblock == 1 ? (
                  <div className={Header_ls.loginBox_block}>
                    <p>{ellipsis64(balancedata.data.contract)}</p>
                    <div>
                      <span
                        onClick={copyonclick.bind(
                          this,
                          balancedata.data.contract,
                        )}
                      >
                        <CopyOutlined />
                      </span>
                      <span
                        onClick={() => {
                          window.open('http://192.168.1.237:8081/v2/contract');
                        }}
                      >
                        <DownloadOutlined />
                      </span>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                className={Header_ls.loginBox_addressBox}
                onClick={addressonclick}
              >
                <img
                  src={`data:image/svg+xml;base64,${indentData(
                    accountaddress.toLowerCase(),
                    64,
                  )}`}
                />
                {ellipsis64(accountaddress)}
                {addressblock == 1 ? (
                  <div className={Header_ls.loginBox_addressBox_data}>
                    <div className={Header_ls.loginBox_addressBox_data_title}>
                      <div
                        className={
                          Header_ls.loginBox_addressBox_data_title_left
                        }
                      >
                        <img
                          src={`data:image/svg+xml;base64,${indentData(
                            accountaddress.toLowerCase(),
                            64,
                          )}`}
                        />
                        {ellipsis64(accountaddress)}
                      </div>
                      <div
                        className={
                          Header_ls.loginBox_addressBox_data_title_right
                        }
                      >
                        <span onClick={copyonclick.bind(this, accountaddress)}>
                          <CopyOutlined />
                        </span>
                        <span onClick={accountwithdrawal}>
                          <ExportOutlined />
                        </span>
                      </div>
                    </div>
                    <div className={Header_ls.loginBox_addressBox_data_t}>
                      <p>
                        {Number(
                          utils.formatEther(balancedata.data.balance),
                        ).toFixed(2)}{' '}
                        ERB
                      </p>
                      <span>${Number(balancedata.data.value).toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
