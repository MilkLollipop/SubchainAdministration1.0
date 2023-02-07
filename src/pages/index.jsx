import styles from './index.less';
import Header from '../components/Header/Header';
import HomePage from './HomePage/HomePage';
export default function IndexPage(props) {
  return (
    <div className={styles.box}>
      <Header />
      {props.children}
    </div>
  );
}
