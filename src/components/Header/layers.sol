// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Chains {
    uint256 autoId; //自动分配的区块链id
    mapping(uint256 => address) admins; //管理员
    mapping(uint256 => string) configs; //区块链配置

    // 新区块链事件
    event NewChain(uint256 indexed id, address indexed admin);
    // 更新区块链配置事件
    event ChainConf(uint256 indexed id, string conf);

    function getAdmin(uint256 id) public view returns (address) {
        return admins[id];
    }

    // 获取指定区块链id的信息，如果id不存在则返回空值
    function getConf(uint256 id) public view returns (string memory) {
        return configs[id];
    }

    // 分配一个区块链id，通过NewChain事件返回id
    function allocId() public returns (uint256 id) {
        if (autoId == 0) {
            autoId = 52000;
        }
        while (admins[autoId] != address(0)) {
            autoId++;
        }
        id = autoId++;
        admins[id] = msg.sender;
        emit NewChain(id, msg.sender);
    }

    // 更新区块链的信息
    function setConf(uint256 id, string memory conf) public {
        require(admins[id] == msg.sender, "not the chain admin");
        configs[id] = conf;
        emit ChainConf(id, conf);
        (id, conf);
    }

    // 注册一个已经存在并运行的区块链信息
    function register(uint256 id, string memory conf) public {
        require(admins[id] == address(0), "chain id already register");
        admins[id] = msg.sender;
        configs[id] = conf;
        emit NewChain(id, msg.sender);
        emit ChainConf(id, conf);
    }
}