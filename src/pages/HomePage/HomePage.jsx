import HomePage_ls from './HomePage.less';
import React, { useState, useEffect } from 'react';
import {
  Space,
  Table,
  Tag,
  Pagination,
  Popover,
  Cascader,
  message,
} from 'antd';
import treaty from '../../utils/treaty.json';
import {
  ellipsisfour,
  timeup,
  timedown,
  statesx,
} from '../../utils/methods/Methods';
import { Link, history } from 'umi';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import moment from 'moment';
export default function HomePage() {
  //页数
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const [titledj, setTitledj] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  //时间排序
  const [timepx, setTimepx] = useState(0);
  //价值排序
  const [pricepx, setPricepx] = useState(0);
  //热门子链
  const [popularsubchaindata, setPopularsubchaindata] = useState([]);
  //MY子链
  const [mypopularsubchaindata, setMypopularsubchaindata] = useState([]);
  //MetaMaskAddress
  const [metamaskaddress, setMetamaskaddress] = useState();
  const [loginstatus, setLoginstatus] = useState(false);
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
    {
      value: 'All',
      label: 'All',
    },
  ];
  const myoptionsstate = [
    {
      value: 'Need Deployment',
      label: 'Need Deployment',
    },
    {
      value: 'Running',
      label: 'Running',
    },
    {
      value: 'Need Starting',
      label: 'Need Starting',
    },
    {
      value: 'All',
      label: 'All',
    },
  ];
  const Hotcolumns = [
    {
      title: 'Chain id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
      align: 'center',
      width: '160px',
    },
    {
      title: 'Chain name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, data) => (
        <div className={HomePage_ls.tablechains}>
          <div className={HomePage_ls.tablechains_img}>
            <img src={data.icon} />
          </div>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Chain address',
      dataIndex: 'user',
      key: 'user',
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
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render: (text) => (
        <span>{moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Price',
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
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, data) =>
        text == 0 ? (
          <div className={HomePage_ls.tablestate}>
            <div className={HomePage_ls.tablestate_y1}></div>
            <Link
              to={{ pathname: '/Details', state: { label: 4, data: data } }}
            >
              Need Deployment
            </Link>
          </div>
        ) : (
          <div className={HomePage_ls.tablestate}>
            <div className={HomePage_ls.tablestate_y2}></div>
            <Link
              to={{ pathname: '/Details', state: { label: 5, data: data } }}
            >
              Running
            </Link>
          </div>
        ),
    },
  ];
  const Mycolumns = [
    {
      title: 'Chain id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
      align: 'center',
      width: '160px',
    },
    {
      title: 'Chain name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, data) => (
        <div className={HomePage_ls.tablechains}>
          <img className={HomePage_ls.tablechains_img} src={data.icon}></img>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Chain address',
      dataIndex: 'user',
      key: 'user',
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
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render: (text) => (
        <span>{moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Price',
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
          <Cascader options={myoptionsstate} onChange={stateonChange}>
            <CaretDownOutlined className={HomePage_ls.tableState_icon} />
          </Cascader>
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, data) =>
        text == 0 ? (
          <Link
            style={{ color: '#1890FF', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: { label: 1, data: data } }}
          >
            Need Deployment
          </Link>
        ) : text == 2 ? (
          <Link
            style={{ color: '#F5222D', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: { label: 2, data: data } }}
          >
            Need Starting
          </Link>
        ) : text == 1 ? (
          <Link
            style={{ color: '#3AAE55', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: { label: 3, data: data } }}
          >
            Running
          </Link>
        ) : (
          <Link
            style={{ color: '#1890FF', textDecoration: 'underline' }}
            to={{ pathname: '/Details', state: { label: 1, data: data } }}
          >
            Need Deployment
          </Link>
        ),
    },
  ];
  useEffect(() => {
    PubSub.subscribe('login_status', (msg, index) => {
      setLoginstatus(index);
    });
    if (localStorage.getItem('login_status')) {
      setLoginstatus(localStorage.getItem('login_status'));
    } else {
      PubSub.subscribe('login_status', (msg, index) => {
        setLoginstatus(index);
      });
    }
    PubSub.subscribe('user_addr', (msg, index) => {
      setMetamaskaddress(index);
    });
    if (localStorage.getItem('SubchainData')) {
      console.log(JSON.parse(localStorage.getItem('SubchainData')));
      setPopularsubchaindata(
        Object.values(JSON.parse(localStorage.getItem('SubchainData'))),
      );
      let text = [];
      for (
        let i = 0;
        i <
        Object.values(JSON.parse(localStorage.getItem('SubchainData'))).length;
        i++
      ) {
        if (
          Object.values(JSON.parse(localStorage.getItem('SubchainData')))[i]
            .user == localStorage.getItem('user_addr')
        ) {
          text.push(
            Object.values(JSON.parse(localStorage.getItem('SubchainData')))[i],
          );
        }
      }
      console.log(text);
      localStorage.setItem('MySubchainData', JSON.stringify(text));
      setMypopularsubchaindata(text);
    }
  }, []);
  useEffect(() => {
    if (loginstatus) {
      console.log(loginstatus);
    }
  }, [loginstatus]);
  useEffect(() => {
    if (popularsubchaindata) {
      console.log(popularsubchaindata);
    }
  }, [popularsubchaindata]);
  useEffect(() => {
    if (
      localStorage.getItem('SubchainData') ||
      localStorage.getItem('MySubchainData')
    ) {
      if (titledj == 0) {
        setPopularsubchaindata(
          Object.values(JSON.parse(localStorage.getItem('SubchainData'))),
        );
      } else {
        setMypopularsubchaindata(
          JSON.parse(localStorage.getItem('MySubchainData')),
        );
      }
    }
  }, [titledj]);
  // 头部热门切换
  function titleonclick(data) {
    setTitledj(data);
  }
  //页码变化
  function pageonchange(data) {
    console.log(data);
    setPage(data);
  }
  //页码变化
  function pageonchange2(data) {
    console.log(data);
    setPage2(data);
  }
  //时间排序
  function tablesorttime(data) {
    setTimepx(data);
    if (data == 0) {
      setPopularsubchaindata(timeup(popularsubchaindata));
      setMypopularsubchaindata(timeup(mypopularsubchaindata));
    } else {
      setPopularsubchaindata(timedown(popularsubchaindata));
      setMypopularsubchaindata(timedown(mypopularsubchaindata));
    }
  }
  //价值排序
  function tablesortprice(data) {
    setPricepx(data);
  }
  //状态筛选
  function stateonChange(data) {
    console.log(data[0]);
    if (data[0] == 'Running') {
      setPopularsubchaindata(
        statesx(
          Object.values(JSON.parse(localStorage.getItem('SubchainData'))),
          1,
        ),
      );
      setMypopularsubchaindata(
        statesx(JSON.parse(localStorage.getItem('MySubchainData')), 1),
      );
    } else if (data[0] == 'Need Deployment') {
      setPopularsubchaindata(
        statesx(
          Object.values(JSON.parse(localStorage.getItem('SubchainData'))),
          0,
        ),
      );
      setMypopularsubchaindata(
        statesx(JSON.parse(localStorage.getItem('MySubchainData')), 0),
      );
    } else if (data[0] == 'Need Starting') {
      setPopularsubchaindata(
        statesx(
          Object.values(JSON.parse(localStorage.getItem('SubchainData'))),
          2,
        ),
      );
      setMypopularsubchaindata(
        statesx(JSON.parse(localStorage.getItem('MySubchainData')), 2),
      );
    } else {
      setPopularsubchaindata(
        Object.values(JSON.parse(localStorage.getItem('SubchainData'))),
      );
      setMypopularsubchaindata(
        JSON.parse(localStorage.getItem('MySubchainData')),
      );
    }
  }
  function Submitonclick() {
    if (localStorage.getItem('login_status') == 'true') {
      history.push('/Submit');
    } else {
      messageApi.info('Please log in first!');
    }
  }
  return (
    <>
      {contextHolder}
      <div className={HomePage_ls.HomePageBox}>
        <div className={HomePage_ls.HomePage_center}>
          {/* 热门 */}
          {loginstatus == 'true' ? (
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
          ) : (
            ''
          )}

          {/* 表格 */}
          {titledj == 0 ? (
            <div className={HomePage_ls.tableBox} id="HomePageTable">
              <Table
                className={HomePage_ls.table}
                columns={Hotcolumns}
                dataSource={popularsubchaindata.slice(
                  (page - 1) * 7,
                  (page - 1) * 8 + 8,
                )}
                pagination={false}
              />
              <Pagination
                className={HomePage_ls.page}
                defaultPageSize={7}
                total={popularsubchaindata.length}
                showSizeChanger={false}
                onChange={pageonchange}
                defaultCurrent={1}
              />
            </div>
          ) : (
            <div className={HomePage_ls.tableBox} id="HomePageTable">
              <Table
                className={HomePage_ls.table}
                columns={Mycolumns}
                dataSource={mypopularsubchaindata.slice(
                  (page2 - 1) * 7,
                  (page2 - 1) * 8 + 8,
                )}
                pagination={false}
              />
              <Pagination
                className={HomePage_ls.page}
                defaultPageSize={8}
                total={mypopularsubchaindata.length}
                showSizeChanger={false}
                onChange={pageonchange2}
              />
            </div>
          )}

          {/* 创建子链 */}
          <span className={HomePage_ls.establish} onClick={Submitonclick}>
            Create Blockchain
          </span>
          <p className={HomePage_ls.describe}>
            The advantages of creating a sub-chain: open their own blockchain
            with one key, participate in consensus, and achieve win-win results
          </p>
        </div>
      </div>
    </>
  );
}
