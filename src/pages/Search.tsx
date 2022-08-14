import React, { useEffect, useState } from 'react';
import images from '@/store/images';
import '@/i18n';
import { useTranslation } from 'react-i18next';

import DictionaryAPI from '@/store/dictionary/dictionary.api';
import { DictionaryActions } from '@/store/dictionary/dictionary.module';

import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import { isMobile } from '@/responsiveUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DictionaryReduxState, ExpressionDto } from '@/store/dictionary/dictionary.type';
import Expression from '@/components/Expression';
import { cyrb53Hash } from '@/utils';
import RoutesPaths from '@/RoutesPaths';
import { SearchParams } from '@/store/dictionary/dictionary.enum';
import { usePerformSearch } from '@/customHooks/usePerformSearch';
import { useDispatch, useSelector } from 'react-redux';
import { Language } from '@/store/app/app.enum';


function Search() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMobileDevice = isMobile();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const navigate = useNavigate();
  const [resultDirectSearch, setResultDirectSearch] = useState([] as ExpressionDto[]);
  const [resultFromDefinitions, setResultFromDefinitions] = useState([] as ExpressionDto[]);
  const expression = searchQuery.get(SearchParams.expression);
  const fromLang = searchQuery.get(SearchParams.fromLang);
  const toLang = searchQuery.get(SearchParams.toLang);
  const performSearch = usePerformSearch();
  const dictionary = useSelector((state: any): DictionaryReduxState => state.dictionary);

  // use isFirstLoad to properly set "from" and "to" languages either in state or in URL depending on the moment when they are out of sync
  // Ex1. page just loaded for combination "rus-chn" but language "chn" doesn't exist so in redux state first possible "toLang" is chosen (lez)
  //      then at this moment there is "toLang=chn" in URL and "toLang=lez" in state, so URL should be updated
  // Ex2. page just loaded for combination "rus-lez" and language "lez" does exist so nothing is changed but default "toLang" in state is "rus"
  //      then at this moment there is "toLang=lez" in URL and "toLang=rus" in state, so state should be updated
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [lastSearch, setLastSearch] = useState({expression: '', fromLang: '', toLang: ''});

  useEffect(() => {
    // initial load
    setIsFirstLoad(false);
    console.log('first search load')
    if (expression != undefined && expression.length > 0) {
        // If languages are not matching on the FIRST load, change state
        if (fromLang !== dictionary.fromLang) {
          dispatch(DictionaryActions.setFromLang(fromLang as Language));
        }
        if (toLang !== dictionary.toLang) {
          dispatch(DictionaryActions.setToLang(toLang as Language));
        }
        if (fromLang != undefined && fromLang.length > 0 && toLang != undefined && toLang.length > 0) {
          DictionaryAPI.search(expression, fromLang, toLang).then(data => setResultDirectSearch(data));
          DictionaryAPI.searchInDefinitions(expression, fromLang, toLang).then(data => setResultFromDefinitions(data));
          setLastSearch({expression, fromLang, toLang});
        }
    }
  }, [expression]);

  useEffect(() => {
    // If languages are not matching AFTER the first load, change url
    if (!isFirstLoad) {
      console.log('2nd.. search load', lastSearch)
      if (expression != undefined && fromLang !== dictionary.fromLang || toLang !== dictionary.toLang) {
        const searchParams = {
          [SearchParams.expression]: expression as string,
          [SearchParams.fromLang]: dictionary.fromLang,
          [SearchParams.toLang]: dictionary.toLang
        };
        setSearchQuery(new URLSearchParams(searchParams));
        if (lastSearch.expression !== searchParams.expression || 
            lastSearch.fromLang !== searchParams.fromLang ||
            lastSearch.toLang !== searchParams.toLang) {
          DictionaryAPI.search(
            searchParams[SearchParams.expression], 
            searchParams[SearchParams.fromLang], 
            searchParams[SearchParams.toLang]
          ).then(data => setResultDirectSearch(data));
          DictionaryAPI.searchInDefinitions(
            searchParams[SearchParams.expression], 
            searchParams[SearchParams.fromLang], 
            searchParams[SearchParams.toLang]
          ).then(data => setResultFromDefinitions(data));
          setLastSearch(searchParams);
        }
      }
    }
  }, [dictionary])
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100vw', minHeight: '100vh'}}>
      <div style={styles(isMobileDevice).searchContainer}>
        <div
          style={styles(isMobileDevice).logoContainer} 
          onClick={() => navigate(RoutesPaths.Home)}
        >
          <img 
            src={images.logo}
            className="App-logo"
            alt="logo"
            style={{ height: isMobileDevice ? '30px' : 'auto', width: isMobileDevice ? 'auto' : '154px'}} //'248px'
          />
        </div>
        <div style={styles(isMobileDevice).searchBarContainer}>
          <SearchBar 
            preFillExpression={expression ?? ''}
            fromLang={fromLang ?? dictionary.fromLang}
            toLang={toLang ?? dictionary.toLang}
            performSearch={performSearch}
            isMobile={isMobileDevice}
          />
        </div>
        <div style={styles(isMobileDevice).menuContainer}>
          <Menu />
        </div>
      </div>
      {
        resultDirectSearch.length > 0 &&
        <div style={{paddingLeft: '5vw', width: '80vw', margin: '50px 0'}}>
          {resultDirectSearch.map((exp, i) => <Expression expression={exp} key={cyrb53Hash(exp.spelling + '_' + i)} />)}
        </div>
      }
      {
        resultFromDefinitions.length > 0 &&
        <div style={{paddingLeft: '5vw', width: '80vw', margin: '50px 0'}}>
          <div style={styles(isMobileDevice).titleBlock}>
            <span> {t('foundInDefinitions')}: </span>
          </div>
          {resultFromDefinitions.map((exp, i) => <Expression expression={exp} key={cyrb53Hash(exp.spelling + '_' + i)} highlightInDefinition={expression} />)}
        </div>
      }
      {
        resultDirectSearch.length === 0 && resultFromDefinitions.length === 0 &&
        <img src={images.emptyBox} 
          alt="nothing found" 
          style={{ marginTop: '100px', height: 'auto', width: '250px', alignSelf: 'center', justifySelf: 'center' }} 
        />
      }
    </div>
  );
}

const styles = (isMobileDevice: boolean): Record<string, React.CSSProperties> => ({
  searchContainer: {
    // position: 'absolute',
    // top: 0,
    display: 'flex',
    // minHeight: '120px', //'160px',
    width: 'calc(100vw - 30px)',//'100vw',
    paddingBottom: '5px', //isMobileDevice ? '0 0 30px 0' : '0 0 30px 30px',
    // paddingTop: isMobileDevice ? '15px' : 0, //'50px' : 0,
    flexDirection: isMobileDevice ? 'column' : 'row',
    alignItems: isMobileDevice ? 'center' : 'unset',//'flex-end',
    justifyContent: isMobileDevice ? 'flex-start' : 'stretch',
    borderBottom: '1px solid #DADCE0',
    margin: '15px',
  },
  logoContainer: {
    height: 'fit-content',
    width: 'fit-content',
    alignSelf: isMobileDevice ? 'flex-start' : 'unset',
    marginLeft: isMobileDevice ? '15px' : '30px',
    marginRight: isMobileDevice ? 0 : '30px',
    marginTop: isMobileDevice ? '0px' : '25px',
    cursor: 'pointer' 
  },
  searchBarContainer: {
    flex: 10,
    // for mobile set width to 100% minus 15px from each side
    width: isMobileDevice ? 'calc(100% - 30px)' : 'unset',
    marginTop: isMobileDevice ? '20px' : '40px', //7vw
    maxWidth: '800px',
    marginLeft: isMobileDevice ? '15px' : 'unset',
    marginRight: isMobileDevice ? '15px' : '0px',
  },
  menuContainer: isMobileDevice ? {
    position: 'absolute',
    top: '15px',
    right: '15px'
  } : {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  titleBlock: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',

    // padding: '20px 0',
    // borderBottomColor: '#0D4949',
		// borderBottomStyle: 'solid',
		// borderBottomWidth: '3px',
    
    marginBottom: '20px',

    fontFamily: 'Cairo, sans-serif',
    fontStyle: 'normal',
    // fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '30px',
    color: '#343643',
  },
});

export default Search;
