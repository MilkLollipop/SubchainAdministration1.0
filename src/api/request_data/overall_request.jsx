import request from '../request';
import treaty from '../../utils/treaty.json';
import { ethers } from 'ethers';
let da = '0x1FC82040E6b3b0DB570eF6e9ef60E7003d6C7FbE';
let address;
let chains = {};
const manager = {};

export async function setAccount(_address) {
  manager.provider = new ethers.providers.JsonRpcProvider(
    'http://43.129.181.130:8561',
  );
  manager.contract = new ethers.Contract(da, treaty, manager.provider);
  manager.id = (await manager.provider.getNetwork()).chainId;
  console.log(manager.id);
  await _updateChains();
  address = _address;
}

export async function getChains() {
  await _updateChains();
  console.log(chains);

  localStorage.setItem('SubchainData', JSON.stringify(chains));
  return chains;
}
// 创建订单
export async function create(signer, conf) {
  if ((await signer.getChainId()) != manager.id) {
    throw new Error('wallet chainid must be ' + manager.id);
  }
  let { provider, contract } = manager;
  contract = contract.connect(signer);
  const tx = await contract.allocId();
  const receipt = await tx.wait();
  const event = receipt.events[0].args;
  conf.genesis.config.chainId = event.id.toNumber();
  await contract.setConf(event.id, JSON.stringify(conf));
}

// 更新订单
export async function update({ signer, id, conf }) {
  if ((await signer.getChainId()) != manager.id) {
    throw new Error('wallet chainid must be ' + manager.id);
  }
  let { contract } = manager;
  contract = contract.connect(signer);
  await contract.setConf(id, conf);
}
async function _updateChains() {
  const { contract, provider, number = 0 } = manager;
  const _number = await provider.getBlockNumber();
  const _chains = await contract.queryFilter(
    contract.filters.ChainConf(null),
    number + 1,
    _number,
  );
  _chains.forEach(({ args: _chain }) => {
    try {
      if (_chain.id.toNumber() < 1) {
        throw new Error('id less than one');
      }
      const _conf = JSON.parse(_chain.conf);
      // if (!ethers.utils.isAddress(_conf.swap)) {
      //   throw new Error('swap contract address format error');
      // }
      const provider = new ethers.providers.JsonRpcProvider(_conf.rpc);
      chains[_chain.id.toString()] = {
        ..._conf,
        id: _chain.id.toNumber(),
      };
    } catch (error) {
      console.log(`chain:`, error);
    }
  });
}

export default {
  setAccount,
  getChains,
  update,
};
