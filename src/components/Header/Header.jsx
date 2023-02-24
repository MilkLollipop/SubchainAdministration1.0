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
import PubSub, { publish } from 'pubsub-js';
import copy from 'copy-to-clipboard';
import { setAccount, getChains } from '../../api/request_data/overall_request';
const crypto = require('crypto');
export default function Header(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 账户地址
  const [accountaddress, setAccountaddress] = useState();
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
      localStorage.setItem('whatwallet', 'true');
    } else {
      localStorage.setItem('whatwallet', 'MetaMask');
    }
    if (type === 'worm') {
      await connect(type);
    } else {
      await connect();
    }
  };
  const logOut = () => {
    setAccountaddress('');
    if (localStorage.getItem('whatwallet') == 'MetaMask') {
      disconnect();
    }
    props.props.history.push('/');
    window.myKey = null;
  };
  //登录login
  const urllogin_q = async (item) => {
    const wallet = ethers.Wallet.createRandom();
    let md5Data = '';
    let result = 0;
    const data = await urllogin(item);
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
        if (signer) {
          secondRequestDataSig = await signer.signMessage(
            JSON.stringify(secondRequestData),
          );
        }
        const formatSecondRequestData = {
          approve_addr: wallet.address,
          result: String(result - 1),
          sig: secondRequestDataSig,
          time_stamp: String(data.data.timeStamp),
          user_addr: address,
        };
        const datatwo = await urllogin(formatSecondRequestData);
        if (datatwo.code == 0) {
          localStorage.setItem('token', datatwo.data.token);
        }
      }
    }
  };
  //登录loginwor
  const urlloginwor_q = async (item) => {
    const wallet = ethers.Wallet.createRandom();
    localStorage.setItem('approve_addr', wallet.address);
    let md5Data = '';
    let result = 0;
    localStorage.setItem('privateKey', wallet.privateKey);
    item.approve_addr = wallet.address;
    const data = await urllogin(item);
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
        let url = localStorage.getItem('backUrl');
        secondRequestDataSig = signMessage(
          JSON.stringify(secondRequestData),
          item.user_addr,
          url,
        );
      }
    }
  };
  const secondLoginWallet = async (sig) => {
    const formatSecondRequestData = {
      approve_addr: localStorage.getItem('approve_addr'),
      result: localStorage.getItem('result'),
      time_stamp: localStorage.getItem('time_stamp'),
      user_addr: localStorage.getItem('user_addr'),
      sig: sig,
    };
    const secondLoginRes = await urllogin(formatSecondRequestData);
    localStorage.setItem('token', secondLoginRes.data.token);
    if (secondLoginRes) {
      localStorage.removeItem('approve_addr');
      localStorage.removeItem('result');
      localStorage.removeItem('time_stamp');
    }
  };
  useEffect(() => {
    if (Object.keys(props.props.location.query).length != 0) {
      if (props.props.location.query.data) {
        let add = JSON.parse(props.props.location.query.data).address;
        localStorage.setItem('user_addr', add);
        setAccountaddress(add);
      }
      if (props.props.location.query.sig) {
        secondLoginWallet(props.props.location.query.sig);
      }
    }
    if (localStorage.getItem('user_addr')) {
      setAccountaddress(localStorage.getItem('user_addr'));
    }
    PubSub.subscribe('user_signer', (msg, index) => {
      setUsersigner(index);
    });
  }, []);

  useEffect(() => {
    if (accountaddress) {
      setLoginstatus(true);
      PubSub.publish('login_status', true);
    } else {
      PubSub.publish('login_status', false);
    }
    setAccount(accountaddress);
    getChains();
  }, [accountaddress]);
  // MetaMask登录
  function MetaMaskSignIn() {
    setIsModalOpen(false);
    login();
    localStorage.setItem('whatwallet', 'MetaMask');
    PubSub.subscribe('MetaMaskAddress', (msg, index) => {
      localStorage.setItem('user_addr', index);
      setAccountaddress(index);
    });
  }
  // WormWallet登录
  const WormWalletSignIn = (e) => {
    setIsModalOpen(false);
    localStorage.setItem('whatwallet', 'Limion');
    let url = location.href;
    const backUrl = encode(url);
    localStorage.setItem('backUrl', url);
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
                    <p></p>
                    <div>
                      <span>
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
                      <p>ERB</p>
                      <span>$</span>
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
