import { ethers } from 'ethers';
import { encode, decode } from 'js-base64';
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
export const signMessage = (message, addr, url) => {
  console.log('signMessage', message, addr, url);
  localStorage.setItem('message', message);
  let backUrl = encode(location.href);
  if (url) {
    backUrl = encode(url);
  }
  console.log('backUrl', backUrl);
  const hash = hashMessage(message);
  console.log('hash', hash);
  const params = JSON.stringify({
    sig: hash,
  });
  // console.log(`http://192.168.1.235:9006/wallet/#/connect-wallet?backUrl=${backUrl}&action=sigMessage&params=${params}&address=${addr}`);
  window.open(
    `http://192.168.1.235:9006/wallet/#/connect-wallet?backUrl=${backUrl}&action=sigMessage&params=${params}&address=${addr}`,
    '_self',
  );
};
