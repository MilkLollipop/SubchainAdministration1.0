import HomePage_ls from './HomePage.less';
import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Pagination, Popover, Cascader } from 'antd';
import { ellipsisfour } from '../../utils/methods/Methods';
import { Link } from 'umi';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
export default function HomePage() {
  const [titledj, setTitledj] = useState(0);
  //时间排序
  const [timepx, setTimepx] = useState(0);
  //价值排序
  const [pricepx, setPricepx] = useState(0);
  const content = (
    <div className={HomePage_ls.tablecontent}>
      <p>
        Volume is the amount of the asset thathas been traded on Wormholes
        duringthe selected time frame.
      </p>
    </div>
  );
  const optionsstate = [
    {
      value: 'Need Deployment',
      label: 'Need Deployment',
    },
    {
      value: 'Running',
      label: 'Running',
    },
  ];
  const Hotcolumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
      align: 'center',
      width: '160px',
    },
    {
      title: 'Chains',
      dataIndex: 'chains',
      key: 'chains',
      align: 'center',
      render: (text) => (
        <div className={HomePage_ls.tablechains}>
          <div className={HomePage_ls.tablechains_img}></div>
          <span>text</span>
        </div>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: (text) => <span>{ellipsisfour(text)}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tabletime}>
          {timepx == 0 ? (
            <ArrowUpOutlined
              style={{ color: '#5CC728' }}
              onClick={tablesorttime.bind(this, 1)}
            />
          ) : (
            <ArrowDownOutlined
              style={{ color: '#F63C47' }}
              onClick={tablesorttime.bind(this, 0)}
            />
          )}
          <span>Time</span>
        </div>
      ),
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tableprice}>
          {pricepx == 0 ? (
            <ArrowUpOutlined
              style={{ color: '#5CC728' }}
              onClick={tablesortprice.bind(this, 1)}
            />
          ) : (
            <ArrowDownOutlined
              style={{ color: '#F63C47' }}
              onClick={tablesortprice.bind(this, 0)}
            />
          )}
          <span>Price</span>
        </div>
      ),
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tableVolume}>
          <span>Volume</span>
          <Popover content={content}>
            <QuestionCircleOutlined className={HomePage_ls.tableVolume_icon} />
          </Popover>
        </div>
      ),
      dataIndex: 'volume',
      key: 'volume',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tableState}>
          <span>State</span>
          <Cascader options={optionsstate} onChange={stateonChange}>
            <CaretDownOutlined className={HomePage_ls.tableState_icon} />
          </Cascader>
        </div>
      ),
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (text) => (
        <div className={HomePage_ls.tablestate}>
          <div className={HomePage_ls.tablestate_y1}></div>
          <span>{text}</span>
        </div>
      ),
    },
  ];
  const Hotdata = [
    {
      id: 1,
      chains: 'name',
      address: '0x5530000000000000000000000616',
      time: '1675783941',
      price: '50000',
      volume: '$50000M',
      state: 'Need Deployment',
    },
  ];
  const Mycolumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
      align: 'center',
      width: '160px',
    },
    {
      title: 'Chains',
      dataIndex: 'chains',
      key: 'chains',
      align: 'center',
      render: (text) => (
        <div className={HomePage_ls.tablechains}>
          <div className={HomePage_ls.tablechains_img}></div>
          <span>text</span>
        </div>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: (text) => <span>{ellipsisfour(text)}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tabletime}>
          {timepx == 0 ? (
            <ArrowUpOutlined
              style={{ color: '#5CC728' }}
              onClick={tablesorttime.bind(this, 1)}
            />
          ) : (
            <ArrowDownOutlined
              style={{ color: '#F63C47' }}
              onClick={tablesorttime.bind(this, 0)}
            />
          )}
          <span>Time</span>
        </div>
      ),
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tableprice}>
          {pricepx == 0 ? (
            <ArrowUpOutlined
              style={{ color: '#5CC728' }}
              onClick={tablesortprice.bind(this, 1)}
            />
          ) : (
            <ArrowDownOutlined
              style={{ color: '#F63C47' }}
              onClick={tablesortprice.bind(this, 0)}
            />
          )}
          <span>Price</span>
        </div>
      ),
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tableVolume}>
          <span>Volume</span>
          <Popover content={content}>
            <QuestionCircleOutlined className={HomePage_ls.tableVolume_icon} />
          </Popover>
        </div>
      ),
      dataIndex: 'volume',
      key: 'volume',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className={HomePage_ls.tableState}>
          <span>State</span>
          <Cascader options={optionsstate} onChange={stateonChange}>
            <CaretDownOutlined className={HomePage_ls.tableState_icon} />
          </Cascader>
        </div>
      ),
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (text) =>
        text == 'Need Deployment' ? (
          <Link
            style={{ color: '#1890FF', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: 1 }}
          >
            {text}
          </Link>
        ) : text == 'Need Starting' ? (
          <Link
            style={{ color: '#F5222D', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: 2 }}
          >
            {text}
          </Link>
        ) : (
          <Link
            style={{ color: '#3AAE55', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: 3 }}
          >
            {text}
          </Link>
        ),
    },
  ];
  const Mydata = [
    {
      id: 1,
      chains: 'name',
      address: '0x5530000000000000000000000616',
      time: '1675783941',
      price: '50000',
      volume: '$50000M',
      state: 'Need Deployment',
    },
    {
      id: 2,
      chains: 'name',
      address: '0x5530000000000000000000000616',
      time: '1675783941',
      price: '50000',
      volume: '$50000M',
      state: 'Need Starting',
    },
    {
      id: 3,
      chains: 'name',
      address: '0x5530000000000000000000000616',
      time: '1675783941',
      price: '50000',
      volume: '$50000M',
      state: 'Running',
    },
  ];
  // 头部热门切换
  function titleonclick(data) {
    setTitledj(data);
  }
  //页码变化
  function pageonchange(data) {
    console.log(data);
  }
  //时间排序
  function tablesorttime(data) {
    setTimepx(data);
  }
  //价值排序
  function tablesortprice(data) {
    setPricepx(data);
  }
  //状态筛选
  function stateonChange(data) {
    console.log(data);
  }
  return (
    <>
      <div className={HomePage_ls.HomePageBox}>
        <div className={HomePage_ls.HomePage_center}>
          {/* 热门 */}
          <div className={HomePage_ls.HomePage_titleBox}>
            <div
              className={
                titledj == 0
                  ? HomePage_ls.HomePage_titlePopular
                  : HomePage_ls.HomePage_titleMy
              }
              onClick={titleonclick.bind(this, 0)}
            >
              Popular Chain
            </div>
            <div
              className={
                titledj == 0
                  ? HomePage_ls.HomePage_titleMy
                  : HomePage_ls.HomePage_titlePopular
              }
              onClick={titleonclick.bind(this, 1)}
            >
              My Chain
            </div>
          </div>
          {/* 表格 */}
          {titledj == 0 ? (
            <div className={HomePage_ls.tableBox} id="HomePageTable">
              <Table
                className={HomePage_ls.table}
                columns={Hotcolumns}
                dataSource={Hotdata}
                pagination={false}
              />
              <Pagination
                className={HomePage_ls.page}
                defaultPageSize={8}
                total={500}
                showSizeChanger={false}
                onChange={pageonchange}
              />
            </div>
          ) : (
            <div className={HomePage_ls.tableBox} id="HomePageTable">
              <Table
                className={HomePage_ls.table}
                columns={Mycolumns}
                dataSource={Mydata}
                pagination={false}
              />
              <Pagination
                className={HomePage_ls.page}
                defaultPageSize={8}
                total={500}
                showSizeChanger={false}
                onChange={pageonchange}
              />
            </div>
          )}

          {/* 创建子链 */}
          <div className={HomePage_ls.establish}>Create Blockchain</div>
          <p className={HomePage_ls.describe}>
            The advantages of creating a sub-chain: open their own blockchain
            with one key, participate in consensus, and achieve win-win results
          </p>
        </div>
      </div>
    </>
  );
}
