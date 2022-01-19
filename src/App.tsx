import React from 'react';
import images from './store/images';
import './App.css';
import './i18n';


import { useTranslation } from 'react-i18next';
import SearchBar from './components/SearchBar';
import Menu from './components/Menu';
import Dictionaries from './components/Dictionaries';

function App() {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage('rus');
  

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
