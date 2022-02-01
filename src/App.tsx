import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import images from './store/images';
import './App.css';
import './i18n';

import SearchBar from './components/SearchBar';
import Menu from './components/Menu';
import Dictionaries from './components/Dictionaries';
import { AppReduxState } from './store/app/app.types';

function App() {
  const app = useSelector((state: any): AppReduxState => state.app);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(app.languageId);
  }, [app.languageId]);

  return (
    <div className="App">
      <Menu />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '700px'}}>
        <img src={images.logo} className="App-logo" alt="logo" />
        <SearchBar />
        <Dictionaries />
      </div>
    </div>
  );
}

export default App;
