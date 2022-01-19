import React from 'react';
import images from './store/images';
import './App.css';
import './i18n';


import { useTranslation } from 'react-i18next';
import SearchBar from './components/SearchBar';
import Menu from './components/Menu';

function App() {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage('lez');
  

  return (
    <div className="App">
      <Menu />
      <img src={images.logo} className="App-logo" alt="logo" />
      <SearchBar />
    </div>
  );
}

export default App;
