import Header_ls from './Header.less';

export default function Header() {
  return (
    <>
      <div className={Header_ls.HeaderBox}>
        <div className={Header_ls.center}>
          <img
            className={Header_ls.logo}
            src={require('../../assets/images/Header/Group 249.png')}
          />
          <div className={Header_ls.Signbox}>Create Blockchain</div>
        </div>
      </div>
    </>
  );
}
