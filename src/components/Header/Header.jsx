import Header_ls from './Header.less';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Popover, Modal, message } from 'antd';
import useWallet from '@/hook/Wallet';
import { encode, decode } from 'js-base64';
import { CopyOutlined, ExportOutlined } from '@ant-design/icons';
import indentData from '@/utils/myIdent';
import { ellipsis64 } from '../../utils/methods/Methods';
import { signMessage } from '@/hook/wallet1';
import PubSub from 'pubsub-js';
import copy from 'copy-to-clipboard';
import {
  adsBalance,
  Popularsubchain,
} from '../../api/request_data/overall_request';
export default function Header(props) {
  // console.log(JSON.parse(props.props.location.query.data));
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 账户地址
  const [accountaddress, setAccountaddress] = useState('');
  //登录状态
  const [loginstatus, setLoginstatus] = useState(false);
  const [addressblock, setAddressblock] = useState(0);
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
    setLoginstatus(false);
    setAccountaddress('');
    if (localStorage.getItem('WormWallet') != 'true') {
      disconnect();
    }
    props.props.history.push('/');
    localStorage.removeItem('MetaMaskAddress');
    window.myKey = null;
  };
  //余额查询
  const adsBalance_q = async (item) => {
    const data = await adsBalance(item);
    console.log('余额查询');
    console.log(data);
  };

  useEffect(() => {
    if (Object.keys(props.props.location.query).length != 0) {
      PubSub.subscribe('WormWalletAddress', (msg, index) => {
        console.log(index);
        setAccountaddress(index);
      });
    }
    if (localStorage.getItem('MetaMaskAddress')) {
      setAccountaddress(localStorage.getItem('MetaMaskAddress'));
    }
    adsBalance_q(
      accountaddress != ''
        ? accountaddress
        : localStorage.getItem('MetaMaskAddress'),
    );
    if (props.props.location.query.data) {
      console.log(JSON.parse(props.props.location.query.data));
      localStorage.setItem('LiminoAddress', props.props.location.query.data);
    }
    if (localStorage.getItem('LiminoAddress')) {
      setAccountaddress(
        JSON.parse(localStorage.getItem('LiminoAddress')).address,
      );
    }
  }, []);
  useEffect(() => {
    if (accountaddress) {
      console.log(accountaddress);
      setLoginstatus(true);
      adsBalance_q(accountaddress);
    }
  }, [accountaddress]);
  useEffect(() => {
    console.log(loginstatus);
    PubSub.publish('Allloginstatus', loginstatus);
  }, [loginstatus]);
  // MetaMask登录
  function MetaMaskSignIn() {
    setIsModalOpen(false);
    login();
    localStorage.setItem('whatwallet', 'MetaMask');
    PubSub.subscribe('MetaMaskAddress', (msg, index) => {
      console.log(index);
      localStorage.setItem('MetaMaskAddress', index);
      setAccountaddress(index);
    });
  }
  // WormWallet登录
  const WormWalletSignIn = (e) => {
    setIsModalOpen(false);
    localStorage.setItem('WormWallet', 'true');
    localStorage.setItem('option', 'login');
    localStorage.setItem('whatwallet', 'Limion');
    let url = location.href;
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
    localStorage.removeItem('whatwallet');
    if (localStorage.getItem('whatwallet') == 'MetaMask') {
      logOut();
    } else {
      localStorage.removeItem('LiminoAddress');
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
              <div className={Header_ls.loginBox_Smartcontract}>
                Smart contract
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
                      <p></p>
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
