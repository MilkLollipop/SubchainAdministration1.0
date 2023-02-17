import { useState, useRef, useEffect } from 'react';
// import Web3Modal from 'web3modal';
// import useDispatch from 'umi';
import Web3Modal from '../utils/web3Modal/index';
import styles from './wallet.less';
import { ethers } from 'ethers';
import { message, Button, Modal, Space, Result } from 'antd';
import PubSub from 'pubsub-js';
import { toast } from 'react-toastify';
import WalletConnectProvider from '@walletconnect/web3-provider';
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    // walletconnect: {
    //   package: WalletConnectProvider,
    //   options: {
    //     infuraId: '7b0e75d38d424750b92791477924d133', // required
    //     bridge: 'https://polygon.bridge.walletconnect.org',
    //   },
    // },
  },
});

const useWallet = () => {
  const [wallet, setWallet] = useState({});
  const [showSelectWallet, setShowSelectWallet] = useState(0);
  // const dispatch = useDispatch();
  async function addNetwork(raw) {
    console.log('changeNetwork');
    if (localStorage.getItem('WormWallet') == 'metamask') {
      let net;
      if (raw.chainId) {
        if (parseInt(raw.chainId) == 51888) {
          // if (parseInt(raw.chainId) == 51895) {
          net = 'wormholes';
        } else {
          net = '';
        }
      } else {
        net = '';
      }
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xCAB0',
              // chainId: '0xCAB7',
              chainName: 'Wormholes',
              nativeCurrency: {
                name: 'ERB',
                symbol: 'ERB',
                decimals: 18,
              },
              rpcUrls: ['https://api.wormholes.com'],
              blockExplorerUrls: ['https://www.wormholesscan.com/#/'],
            },
          ],
        });
        console.log('changeNetwork done');
        // const provider = new ethers.providers.Web3Provider(raw);
        // const signer = provider ? provider.getSigner() : null;
        // const address = (await signer.getAddress()).toLowerCase();
        console.log(address);
        console.log(signer);
        console.log(provider);
        // dispatch({
        //   type: 'userModel/setUserAddr',
        //   payload: address,
        // });
        // dispatch({
        //   type: 'userModel/setUserSig',
        //   payload: signer,
        // });
        // dispatch({
        //   type: 'userModel/setProvider',
        //   payload: provider,
        // });
        // setWallet({ raw, net, signer, address, provider });
      } catch (error) {
        console.log(error);
        info();
      }
    }

    // window.location.reload();
  }
  const info = () => {
    Modal.info({
      content: (
        <div className={styles.modalBox}>
          <img src={require('../assets/images/WIFI5.png')}></img>
          <div className={styles.modalTitle}>
            Wrong network connection detected
          </div>
          <div className={styles.modalinfo}>
            Looks like your currrent network selection is not supported please
            switch to Wormholes network in your wallet to continue
          </div>
        </div>
      ),
      okText: 'ok',
      onOk() {
        Modal.destroyAll();
      },
    });
  };
  const setRaw = async (raw) => {
    // console.log('setRaw',window.ethereum);
    if (raw) {
      console.log('setRaw', raw.chainId);
      // console.log('setRaw', raw.chainId, eval(raw.chainId).toString(16));
      // const net = parseInt(raw.chainId) === 20211209 ? 'wormholes' : '';
      let net;
      if (raw.chainId) {
        if (parseInt(raw.chainId) == 51888) {
          // if (parseInt(raw.chainId) == 51895) {
          net = 'wormholes';
        } else {
          net = '';
        }
      } else {
        net = '';
      }

      // const net = parseInt(raw.chainId) === 4 ? 'wormholes' : '';
      console.log(net);
      if (net === '') {
        if (localStorage.getItem('WormWallet') == 'metamask') {
          addNetwork(raw);
        } else {
          const provider = new ethers.providers.Web3Provider(raw);
          const signer = provider ? provider.getSigner() : null;
          const address = (await signer.getAddress()).toLowerCase();
          console.log(address);
          console.log(signer);
          console.log(provider);
          // dispatch({
          //   type: 'userModel/setUserAddr',
          //   payload: address,
          // });
          // dispatch({
          //   type: 'userModel/setUserSig',
          //   payload: signer,
          // });
          // dispatch({
          //   type: 'userModel/setProvider',
          //   payload: provider,
          // });
          setWallet({ raw, net, signer, address, provider });
        }
      } else {
        const provider = net ? new ethers.providers.Web3Provider(raw) : null;
        const signer = provider ? provider.getSigner() : null;
        const address = (await signer.getAddress()).toLowerCase();
        console.log(address);
        PubSub.publish('MetaMaskAddress', address);
        console.log(signer);
        PubSub.publish('user_signer', signer);
        console.log(provider);
        PubSub.publish('user_provider', provider);
        // dispatch({
        //   type: 'userModel/setUserAddr',
        //   payload: address,
        // });
        // dispatch({
        //   type: 'userModel/setUserSig',
        //   payload: signer,
        // });
        // dispatch({
        //   type: 'userModel/setProvider',
        //   payload: provider,
        // });
        setWallet({ raw, net, signer, address, provider });
      }
    }
  };

  const disconnect = async () => {
    if (localStorage.getItem('WormWallet') === 'true') {
      // let raws = await web3Modal.connectTo('wormholeswallet');
      console.log('CLICK DISCONNECT');
      if (window.myKey) {
        console.log('CLICK DISCONNECT myKey');
        setWallet({});
      } else {
        console.log('CLICK DISCONNECT WALLET', wallet);
        setWallet((wallet) => {
          const { raw } = wallet;
          if (raw) {
            console.log('CLICK DISCONNECT raw');
            web3Modal.clearCachedProvider();
            raw.removeAllListeners();
          } else {
            console.log('CLICK DISCONNECT web3Modal');
            web3Modal.clearCachedProvider();
            raws.removeAllListeners();
          }
          return {};
        });
      }
      localStorage.setItem('WormWallet', 'false');
    } else {
      console.log('CLICK DISCONNECT');
      if (window.myKey) {
        console.log('CLICK DISCONNECT myKey');
        setWallet({});
      } else {
        console.log('CLICK DISCONNECT WALLET', wallet);
        setWallet((wallet) => {
          const { raw } = wallet;
          if (raw) {
            console.log('CLICK DISCONNECT raw');
            web3Modal.clearCachedProvider();
            raw.removeAllListeners();
          } else {
            console.log('CLICK DISCONNECT web3Modal');
            web3Modal.clearCachedProvider();
          }
          return {};
        });
      }
      localStorage.setItem('WormWallet', 'false');
    }
  };

  const connect = async (type) => {
    if (window.myKey) {
      try {
        const net = 'wormholes';
        let signer = new ethers.Wallet(window.myKey);
        // console.log('signer', signer);
        const provider = new ethers.providers.JsonRpcProvider(
          'http://api.wormholestest.com',
        );
        // console.log('provider', provider);
        signer = signer.connect(provider);
        const address = (await signer.getAddress()).toLowerCase();
        // console.log('net, signer, address', net, signer, address, provider);
        // console.log('address', address);
        setWallet({ net, signer, address, provider });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (localStorage.getItem('WormWallet') == 'metamask') {
          if (!wallet.raw) {
            // const raw = await web3Modal.connect();
            let raw;
            if (type == 'worm') {
              raw = await web3Modal.connectTo('wormholeswallet');
              // const backUrl = location.origin + location.pathname;
              // window.open(
              //   `http://192.168.1.235:9006/wallet/#/connect-wallet?backUrl=${backUrl}&action=login`,
              //   '_self',
              // );
            } else {
              raw = await web3Modal.connect();
            }
            console.log('=========', raw);
            raw.on('accountsChanged', (accounts) => {
              console.log('accountsChanged', accounts);
              if (accounts.length === 0) {
                disconnect();
              } else {
                setRaw(raw);
              }
            });
            raw.on('chainChanged', () => {
              console.log('chainChanged');
              setRaw(raw);
              // addNetwork(raw)
            });
            raw.on('connect', () => {
              console.log('connect');
              setRaw(raw);
            });
            raw.on('disconnect', () => {
              console.log('disconnect');
              setWallet((wallet) => ({ ...wallet, signer: null }));
              web3Modal.clearCachedProvider();
              raw.removeAllListeners();
            });
            setRaw(raw);
          } else {
            console.log('=========', wallet.raw);
            wallet.raw.on('accountsChanged', (accounts) => {
              if (accounts.length === 0) {
                disconnect();
              } else {
                setRaw(raw);
              }
            });
            wallet.raw.on('chainChanged', () => {
              setRaw(raw);
              // addNetwork(raw)
            });
            wallet.raw.on('connect', () => {
              setRaw(raw);
            });
            wallet.raw.on('disconnect', () => {
              setWallet((wallet) => ({ ...wallet, signer: null }));
              web3Modal.clearCachedProvider();
              wallet.raw.removeAllListeners();
            });
            setRaw(wallet.raw);
          }
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    }
  };
  function hashMessage(message) {
    const messagePrefix = '\x19Ethereum Signed Message:\n';
    if (typeof message === 'string') {
      message = ethers.utils.toUtf8Bytes(message);
    }
    return ethers.utils.keccak256(
      ethers.utils.concat([
        ethers.utils.toUtf8Bytes(messagePrefix),
        ethers.utils.toUtf8Bytes(String(message.length)),
        message,
      ]),
    );
  }
  const connectWallet = async (addr, net) => {
    console.log('connectWallet', addr, net);
    const address = addr.toLowerCase();
    const chainID = net;
    let signer;
    signer = {
      _isSigner: true,
      _index: new Date().getTime(),
    };
    let provider;
    provider = {
      _isProvider: true,
      _index: new Date().getTime(),
    };
    setWallet({ net: chainID, signer, address, provider });
  };
  useEffect(() => {
    // if (localStorage.getItem('WormWallet') === 'true') {
    //   console.log('WormWallet', window.location.search);
    //   let searchParams = new URLSearchParams(window.location.search);
    //   console.log('WormWallet', searchParams);
    // }
    if (localStorage.getItem('WormWallet') === 'true') {
      let signer;
      signer = {
        _isSigner: true,
        _index: new Date().getTime(),
      };
      let provider;
      provider = {
        _isProvider: true,
        _index: new Date().getTime(),
      };
      let address = localStorage.getItem('user_addr');
      setWallet({ signer, address, provider });
    }
    if (web3Modal.cachedProvider || window.myKey) {
      // console.log('web3Modal.cachedProvider', web3Modal.cachedProvider);
      // console.log('window.myKey', window.myKey);
      if (
        localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER') == `"injected"`
      ) {
        connect();
        setShowSelectWallet(showSelectWallet + 1);
        console.log('setShowSelectWallet(true)');
      }
    }
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnect,
    connect,
    showSelectWallet,
    setShowSelectWallet,
  };
};

export default useWallet;
