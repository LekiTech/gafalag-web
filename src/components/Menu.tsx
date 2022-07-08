import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AppReduxState } from '@/store/app/app.types';
import { useOutsideAlerter } from './utils';
import { AppActions } from '@/store/app/app.module';
import { Language } from '@/store/app/app.enum';


const supportedLanguages = [
  Language.LEZGI,
  Language.RUSSIAN,
  Language.ENGLISH
]

function Menu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const app = useSelector((state: any): AppReduxState => state.app);
  const [showLanguages, setShowLanguages] = useState(false);
  const languagesButtonRef = useRef(null);
  useOutsideAlerter(languagesButtonRef, () => setShowLanguages(false));
  const handleLangChange = (event: SelectChangeEvent<string>) => {
    setShowLanguages(false);
    dispatch(AppActions.setLanguageId(event.target.value));
  };
  return (
    <div style={styles.container}>
      {/* <div style={styles.pageLink}><a>{t('sources')}</a></div> */}
      <Select
        value={app.languageId}
        onChange={handleLangChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        variant="standard"
      >
        {
          supportedLanguages.map(lang =>  <MenuItem value={lang}>{t(`languages.${lang}`)}</MenuItem>)
        }
      </Select>
      {/* <div style={styles.login}><a>{t('login')}</a></div> */}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    // position: 'absolute',
    // top: '15px',
    // right: '15px',
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
    cursor: 'pointer',
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px 20px',
    background: '#0D4949',
    borderRadius: '100px',
    cursor: 'pointer',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
  },
  languagesDropdown: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FCFCFC',

  },
}

export default Menu;
