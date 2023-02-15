import styles from './index.less';
import Header from '../components/Header/Header';
import HomePage from './HomePage/HomePage';
import { ToastContainer, toast } from 'react-toastify';
export default function IndexPage(props) {
  console.log(props);
  if (Object.keys(props.location.query).length != 0) {
    PubSub.publish(
      'WormWalletAddress',
      JSON.parse(props.location.query.data).address,
    );
  }

  return (
    <>
      <div className={styles.box}>
        <Header props={props} />
        {props.children}
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}
