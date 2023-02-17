import styles from './index.less';
import Header from '../components/Header/Header';
import HomePage from './HomePage/HomePage';
import { ToastContainer, toast } from 'react-toastify';
export default function IndexPage(props) {
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
