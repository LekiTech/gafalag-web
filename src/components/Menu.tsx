import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppReduxState } from '@/store/app/app.types';
import { useOutsideAlerter } from './utils';
import { AppActions } from '@/store/app/app.module';
import { Language } from '@/store/app/app.enum';

function createLanguageSelectButton(selectedLang: string, lang: Language, selectLang: (lang: string) => void, t: any) {
  if (selectedLang !== lang) {
    return (
    <div
      key={`lang_select_${lang}`}
      onClick={() => selectLang(lang)}
      style={{marginTop: '10px'}}
      >
        <span>{t(`languages.${lang}`)}</span>
    </div>);
  }
}

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
  const selectLang = (lang: string) => {
    setShowLanguages(false);
    console.log('SELECTED LANG ' + lang)
    dispatch(AppActions.setLanguageId(lang));
  };
  console.log(showLanguages);
  return (
    <div style={styles.container}>
      <div style={styles.pageLink}><a>{t('sources')}</a></div>
      <div 
        style={{...styles.pageLink}}
        ref={languagesButtonRef}
        onClick={() => {
          if (!showLanguages) {
            setShowLanguages(true);
            }
          }
        }>
        <a>
          {
            // @ts-ignore
            t(`languages.${app.languageId}`)
          }
        </a>
        {showLanguages &&
          <div style={styles.languagesDropdown}>
            {supportedLanguages.map(lang => createLanguageSelectButton(app.languageId, lang, selectLang, t))}
          </div>
        }
      </div>
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
