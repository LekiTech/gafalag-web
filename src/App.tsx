import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import "./style.scss";
import './i18n';

import { AppReduxState } from './store/app/app.types';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RoutesPaths from './RoutesPaths';
import { DictionaryActions } from './store/dictionary/dictionary.module';
import DictionaryPages from './pages/DictionaryPages';

function App() {
  const app = useSelector((state: any): AppReduxState => state.app);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(app.languageId);
    console.log('Downloading sources');
    dispatch(DictionaryActions.downloadSources());
  }, [app.languageId]);

  const title = t('meta.title') ?? 'Gafalag - удобный словарь языков малочисленных народов | Лезгинский словарь | Табасаранский словарь';
  const description = t('meta.description') ?? 'Словарь и переводчик языков малочисленных народов с открытым исходным кодом. На данный момент есть поддержка Лезгинского и Табасаранского языков.  У нас вы можете найти переводы слов словарей Лезгинско-Русского, Русско-Лезгинского и Табасаранско-Русского. Мы так же поддерживаем поиск в переводах что даёт также возможность поиска по виду Русско-Табасаранского словаря. Наш словарь помимо прочего даёт вам возможность неточного поиска что при введении нескольких слов работает как переводчик или разговорник находя все или некоторые введенные вами слова';
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <Routes>
        <Route path={RoutesPaths.Home} element={<Home />} />
        <Route path={RoutesPaths.Search} element={<Search />} />
        <Route path={RoutesPaths.Dictionary} element={<DictionaryPages />} />
      </Routes>
    </div>
  );
}

export default App;
