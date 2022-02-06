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
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RoutesPaths from './RoutesPaths';

function App() {
  const app = useSelector((state: any): AppReduxState => state.app);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(app.languageId);
  }, [app.languageId]);

  return (
    <div className="App">
      <Routes>
        <Route path={RoutesPaths.Home} element={<Home />} />
        <Route path={RoutesPaths.Search} element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
