import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './i18n';

import { AppReduxState } from './store/app/app.types';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RoutesPaths from './RoutesPaths';
import { DictionaryActions } from './store/dictionary/dictionary.module';

function App() {
  const app = useSelector((state: any): AppReduxState => state.app);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(app.languageId);
    dispatch(DictionaryActions.downloadSources());
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
