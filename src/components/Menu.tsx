import React from 'react';
import { useTranslation } from 'react-i18next';

function Menu() {
  const { t } = useTranslation();
  
  return (
    <div style={styles.container} className="menu-container">
      <div style={styles.pageLink}><a>{t('sources')}</a></div>
      <div style={styles.pageLink}><a>{t('languages.lezgi')}</a></div>
      <div style={styles.login}><a>{t('login')}</a></div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pageLink: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '18px',
    color: '#0D4949',
    marginRight: '30px',
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px 20px',
    background: '#0D4949',
    borderRadius: '100px',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
  }
}

export default Menu;
